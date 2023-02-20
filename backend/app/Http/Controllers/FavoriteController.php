<?php

namespace App\Http\Controllers;

use App\Exceptions\Favorite\FavoriteNotFoundException;
use App\Repositories\FavoriteRepositoryInterface;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;

class FavoriteController extends Controller
{
    public function __construct(
        private FavoriteRepositoryInterface $favoriteRepository
    ) {
    }

    public function create(Request $request)
    {
        $favoriteData = $this->validate($request, [
            'imdb_id' => 'required',
            'title' => 'required',
            'poster' => 'required',
        ]);

        $favoriteData['user_id'] = $request->user->getId();
        $favorite = $this->favoriteRepository->create($favoriteData);

        return $favorite->toJson();
    }

    public function destroy(int $id)
    {
        $favorite = $this->favoriteRepository->getById($id) ??
            throw new FavoriteNotFoundException();

        return $this->favoriteRepository->destroy($favorite);
    }
}
