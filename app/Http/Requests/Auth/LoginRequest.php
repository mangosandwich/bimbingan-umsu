<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['nullable', 'string'],
            'npm' => ['nullable', 'string'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $login = trim($this->input('npm') ?? $this->input('email') ?? '');
        $password = (string) $this->input('password');
        $remember = $this->boolean('remember');

        $apiErrorMessage = null;

        // 1. Coba Authentikasi via SIMAKAD UMSU API jika bukan environment testing
        if (! app()->environment('testing')) {
            try {
                $authService = app(\App\Services\AuthService::class);
                $simakadResult = $authService->loginSimakad($login, $password);

                if (!empty($simakadResult['success'])) {
                    $data = $simakadResult['data'] ?? [];

                    // Cari user lokal berdasarkan email / username / NPM
                    $user = \App\Models\User::where('email', $login)
                        ->orWhere('email', 'like', $login . '@%')
                        ->orWhere('npm', $login)
                        ->orWhere('name', $login)
                        ->first();

                    if (!$user) {
                        // Jika belum ada di lokal, otomatis buatkan akun mahasiswa baru
                        $studentEmail = str_contains($login, '@') ? $login : $login . '@student.umsu.ac.id';
                        $studentName = $data['nama'] ?? $data['name'] ?? $data['nama_mahasiswa'] ?? ('Mahasiswa ' . $login);

                        $user = \App\Models\User::create([
                            'name'     => $studentName,
                            'email'    => $studentEmail,
                            'npm'      => $login,
                            'password' => bcrypt($password),
                        ]);

                        if (method_exists($user, 'assignRole')) {
                            $user->assignRole('student');
                        }
                    } else {
                        if (empty($user->npm) && !str_contains($login, '@')) {
                            $user->update(['npm' => $login]);
                        }
                    }

                    Auth::login($user, $remember);
                    RateLimiter::clear($this->throttleKey());
                    return;
                } else {
                    $apiErrorMessage = $simakadResult['message'] ?? null;
                }
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning('SIMAKAD API auth fallback to local: ' . $e->getMessage());
            }
        }

        // 2. Fallback: Authentikasi Lokal Laravel (Untuk Dosen/Admin/Mahasiswa lokal)
        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if (! Auth::attempt([$field => $login, 'password' => $password], $remember)) {
            // Coba lagi dengan field email atau npm jika attempt pertama gagal
            $authenticated = false;
            if ($field === 'username') {
                if (Auth::attempt(['email' => $login, 'password' => $password], $remember) ||
                    Auth::attempt(['npm' => $login, 'password' => $password], $remember)) {
                    $authenticated = true;
                }
            }

            if (! $authenticated) {
                RateLimiter::hit($this->throttleKey());

                throw ValidationException::withMessages([
                    'email' => $apiErrorMessage ?: __('auth.failed'),
                ]);
            }
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }
}
