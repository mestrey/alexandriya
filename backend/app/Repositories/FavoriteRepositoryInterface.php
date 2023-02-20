<?php

namespace App\Repositories;

use App\Models\Favorite;

interface FavoriteRepositoryInterface
{
    public function getById(int $id): ?Favorite;

    public function create(array $data): Favorite;
    public function destroy(Favorite $favorite): bool;
}
