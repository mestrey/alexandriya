<?php

namespace App\Services;

interface AuthAccessServiceInterface
{
    public function __construct(
        string $tokenSecret,
        string $refreshTokenSecret,
        int $tokenExp,
        int $refreshTokenExp,
    );

    public function createToken(int $user_id, string $device): string;
    public function createResfreshToken(?array $payload = null): string;

    public function updateResfreshToken(string $exp, int $used): string;

    public function validateToken(string $token): bool|\Exception;
    public function validateRefreshToken(string $token): bool|\Exception;

    public function getTokenPayload(string $token): array|\Exception;
}
