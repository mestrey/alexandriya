<?php

namespace App\Http\Controllers;

use App\Exceptions\Authentication\AccountNotFoundException;
use App\Exceptions\Authentication\UnauthorizedException;
use App\Repositories\AuthAccessRepositoryInterface;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Lumen\Routing\Controller;

class AuthenticationController extends Controller
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private AuthAccessRepositoryInterface $authAccessRepository,
    ) {
    }

    private function returnAuthAccess(int $userId, string $device): array
    {
        $authAccess = $this->authAccessRepository->create($userId, $device);

        return $authAccess->toArray();
    }

    public function register(Request $request,)
    {
        $userData = $this->validate($request, [
            'username' => 'required|min:2|max:30|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = $this->userRepository->create($userData);

        return $this->returnAuthAccess($user->getId(), $request->userAgent());
    }

    public function login(Request $request)
    {
        $data = $this->validate($request, [
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = $this->userRepository->getByUsername($data['username']) ??
            throw new AccountNotFoundException();

        if (!Hash::check($data['password'], $user->getPassword())) {
            throw new UnauthorizedException();
        }

        return $this->returnAuthAccess($user->getId(), $request->userAgent());
    }

    public function refresh(Request $request)
    {
        $data = $this->validate($request, [
            'token' => 'required',
            'refresh_token' => 'required',
        ]);

        $newAuthAccess = $this->authAccessRepository->refreshToken($data['token'], $data['refresh_token']);

        return $newAuthAccess->toArray();
    }

    public function logout(Request $request)
    {
        return [
            'success' => (bool)$this->authAccessRepository->removeByToken($request->bearerToken())
        ];
    }
}
