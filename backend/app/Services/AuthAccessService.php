<?php

namespace App\Services;

use App\Exceptions\Authentication\TokenExpiredException;
use App\Exceptions\Authentication\TokenInvalidException;

class AuthAccessService implements AuthAccessServiceInterface
{
    private const HASHING_ALG = 'sha256';
    private const TOKEN_TYPE = 'jwt';

    public function __construct(
        private string $tokenSecret,
        private string $refreshTokenSecret,
        private int $tokenExp,
        private int $refreshTokenExp,
    ) {
    }

    private function generateHeader(): array
    {
        return [
            'alg' => self::HASHING_ALG,
            'type' => self::TOKEN_TYPE,
        ];
    }

    private function generateExpirationFromMinutes(int $exp): int
    {
        return time() + $exp * 60;
    }

    private function generateRefreshTokenPayload(int $exp, int $used = 0): array
    {
        return [
            'exp' =>  $exp,
            'used' => $used,
        ];
    }

    private function generateTokenPayload(int $userId, string $device, int $exp): array
    {
        return [
            'user_id' => $userId,
            'device' => $device,
            'exp' => $exp,
        ];
    }

    private function encodeData(array $data): string
    {
        return rtrim(strtr(base64_encode(json_encode($data)), '+/', '-_'), '=');
    }

    private function decodeData(string $data): array
    {
        return json_decode(base64_decode(str_replace(array('-', '_'), array('+', '/'), $data)), true);
    }

    private function getTokenSign(string $header, string $payload, string $secret): string
    {
        return hash_hmac(
            self::HASHING_ALG,
            $header . '.' . $payload,
            $secret
        );
    }

    private function createJWTToken(array $header, array $payload, string $secret): string
    {
        $encodedHeader = $this->encodeData($header);
        $encodedPayload = $this->encodeData($payload);

        return implode('.', [$encodedHeader, $encodedPayload, $this->getTokenSign(
            $encodedHeader,
            $encodedPayload,
            $secret
        )]);
    }

    public function createToken(int $userId, string $device): string
    {
        return $this->createJWTToken(
            $this->generateHeader(),
            $this->generateTokenPayload($userId, $device, $this->generateExpirationFromMinutes($this->tokenExp)),
            $this->tokenSecret
        );
    }

    public function createResfreshToken(?array $payload = null): string
    {
        return $this->createJWTToken(
            $this->generateHeader(),
            $payload ?? $this->generateRefreshTokenPayload($this->generateExpirationFromMinutes($this->refreshTokenExp)),
            $this->refreshTokenSecret
        );
    }

    public function updateResfreshToken(string $exp, int $used): string
    {
        return $this->createResfreshToken($this->generateRefreshTokenPayload(intval($exp), $used));
    }

    private function explodeToken(string $token): array|\Exception
    {
        $parts = explode('.', $token);

        if (count($parts) !== 3) {
            throw new TokenInvalidException();
        }

        return $parts;
    }

    public function getTokenPayload(string $token): array|\Exception
    {
        $parts = $this->explodeToken($token);
        $encodedPayload = $parts[1];

        return $this->decodeData($encodedPayload);
    }

    private function validateJWTToken(string $token, string $secret): bool|\Exception
    {
        $parts = $this->explodeToken($token);
        $encodedHeader = $parts[0];
        $encodedPayload = $parts[1];
        $signature = $parts[2];

        $createdSignature = $this->getTokenSign($encodedHeader, $encodedPayload, $secret);

        if ($signature !== $createdSignature) {
            throw new TokenInvalidException();
        }

        if (time() > $this->decodeData($encodedPayload)['exp']) {
            throw new TokenExpiredException();
        }

        return true;
    }

    public function validateRefreshToken(string $token): bool|\Exception
    {
        return $this->validateJWTToken($token, $this->refreshTokenSecret);
    }

    public function validateToken(string $token): bool|\Exception
    {
        return $this->validateJWTToken($token, $this->tokenSecret);
    }
}
