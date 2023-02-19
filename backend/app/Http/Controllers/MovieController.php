<?php

namespace App\Http\Controllers;

use App\Services\OmdbApiServiceInterface;
use Laravel\Lumen\Routing\Controller;

class MovieController extends Controller
{
    public function __construct(
        private OmdbApiServiceInterface $omdbApiService
    ) {
    }

    private function requestSucceded(array $response): bool
    {
        return filter_var($response['Response'], FILTER_VALIDATE_BOOLEAN);
    }

    public function search(string $query)
    {
        $response = $this->omdbApiService->search($query)->json();

        if ($this->requestSucceded($response)) {
            return $response;
        } else {
            throw new \Exception($response['Error'], 500);
        }
    }
}
