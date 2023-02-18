<?php

namespace App\Repositories;

use App\Models\User;

interface UserRepositoryInterface
{
    public function getById(int $id): ?User;
    public function getByUsername(string $username): ?User;

    public function create(array $data): User;
}
