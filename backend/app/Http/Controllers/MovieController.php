<?php

namespace App\Http\Controllers;

use App\Services\OmdbApiServiceInterface;
use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Routing\Controller;

class MovieController extends Controller
{
    public function __construct(
        private OmdbApiServiceInterface $omdbApiService
    ) {
    }

    public function search(string $query)
    {
        $response = $this->omdbApiService->search($query)->json();

        return new JsonResponse($response);
    }
}
