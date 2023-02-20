<?php

namespace App\Repositories;

use App\Models\Favorite;

class FavoriteRepository implements FavoriteRepositoryInterface
{
    public function getById(int $id): ?Favorite
    {
        return Favorite::where('id', $id)->first();
    }


    public function create(array $data): Favorite
    {
        return Favorite::create($data);
    }

    public function destroy(Favorite $favorite): bool
    {
        return $favorite->delete();
    }
}
