<?php

namespace App\Http\Middleware;

use App\Repositories\UserRepositoryInterface;
use App\Services\AuthAccessServiceInterface;
use Closure;

class AuthMiddleware
{
    public function __construct(
        private AuthAccessServiceInterface $authAccessService,
        private UserRepositoryInterface $userRepository,
    ) {
    }

    public function handle($request, Closure $next)
    {
        $token = $request->bearerToken() ??
            // throw new UnauthorizedException();
            throw new \Exception();

        $this->authAccessService->validateToken($token);
        $tokenPayload = $this->authAccessService->getTokenPayload($token);

        if ($tokenPayload['device'] !== $request->userAgent()) {
            // throw new InvalidTokenException();
            throw new \Exception();
        }

        $user = $this->userRepository->getById($tokenPayload['user_id']) ??
            // throw new AccountNotFoundException();
            throw new \Exception();

        $request->merge(['user' => $user]);
        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
    }
}
