<?php

use App\Services\AuthService;
use Illuminate\Support\Facades\Http;

uses(Tests\TestCase::class);

test('loginSimakad returns error when API returns status false', function () {
    Http::fake([
        '*/Simakad/login' => Http::response([
            'status'  => false,
            'message' => 'NPM Tidak Ditemukan!',
        ], 200),
    ]);

    $authService = new AuthService();
    $result = $authService->loginSimakad('99999999', 'ngasal');

    expect($result['success'])->toBeFalse();
    expect($result['message'])->toBe('NPM Tidak Ditemukan!');
});

test('loginSimakad returns success when API returns valid status true and student data', function () {
    Http::fake([
        '*/Simakad/login' => Http::response([
            'status' => true,
            'data'   => [
                'npm'  => '2210000001',
                'nama' => 'Budi Santoso',
            ],
        ], 200),
    ]);

    $authService = new AuthService();
    $result = $authService->loginSimakad('2210000001', 'password123');

    expect($result['success'])->toBeTrue();
    expect($result['data']['data']['nama'])->toBe('Budi Santoso');
});
