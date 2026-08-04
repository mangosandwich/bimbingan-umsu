<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AuthService
{
    protected string $baseUrl;

    public function __construct()
    {
        $url = env('API_UMSU') ?: config('services.umsu.api_url');
        if (!$url) {
            $url = 'https://api.umsu.ac.id';
        }
        if (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://')) {
            $url = 'https://' . $url;
        }
        $this->baseUrl = rtrim($url, '/');
    }

    /**
     * Login ke SIMAKAD UMSU API
     *
     * @param string $npm
     * @param string $password
     * @return array
     */
    public function loginSimakad(string $npm, string $password): array
    {
        $endpoint = $this->baseUrl . '/Simakad/login';

        try {
            $response = Http::withoutVerifying()
                ->withHeaders([
                    'Content-Type' => 'application/json',
                ])->post($endpoint, [
                    'npm'      => $npm,
                    'password' => $password,
                ]);

            $json = $response->json() ?? [];
            Log::info('SIMAKAD API Response:', ['status' => $response->status(), 'body' => $json]);

            $statusVal = $json['status'] ?? null;

            // Flag kegagalan yang jelas
            $isExplicitFailure = ($statusVal === false || $statusVal === 'false' || $statusVal === 0 || $statusVal === '0' || strtolower((string)$statusVal) === 'error' || strtolower((string)$statusVal) === 'failed');

            // Flag keberhasilan yang jelas
            $isExplicitSuccess = ($statusVal === true || $statusVal === 1 || $statusVal === 200 || $statusVal === '200' || strtolower((string)$statusVal) === 'success' || strtolower((string)$statusVal) === 'true');
            $hasTokenOrData = isset($json['token']) || isset($json['data']) || isset($json['user']) || isset($json['npm']);

            if ($response->successful() && !$isExplicitFailure && ($isExplicitSuccess || $hasTokenOrData)) {
                return [
                    'success' => true,
                    'status'  => $response->status(),
                    'data'    => $json,
                ];
            }

            return [
                'success' => false,
                'status'  => $response->status(),
                'message' => $json['message'] ?? $json['msg'] ?? $json['error'] ?? 'Gagal otentikasi SIMAKAD UMSU',
                'data'    => $json,
            ];
        } catch (\Throwable $e) {
            Log::error('AuthService loginSimakad error: ' . $e->getMessage());

            return [
                'success' => false,
                'status'  => 500,
                'message' => 'Terjadi kesalahan koneksi ke API UMSU: ' . $e->getMessage(),
            ];
        }
    }
}
