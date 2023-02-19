<?php

namespace App\Http\Controllers;

use App\Exceptions\Authentication\AccountNotFoundException;
use App\Repositories\UserRepositoryInterface;
use Laravel\Lumen\Routing\Controller;

class UserController extends Controller
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {
    }

    public function show(int $id)
    {
        $user = $this->userRepository->getById($id) ??
            throw new AccountNotFoundException();

        return $user->toJson();
    }
}
