<?php

namespace App\Services;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class OmdbApiService implements OmdbApiServiceInterface
{
    private const OMDB_API_BASE_URL = 'https://www.omdbapi.com/';

    public function __construct(
        private string $apiKey,
    ) {
    }

    private function getOmdbApiUrl(): string
    {
        return self::OMDB_API_BASE_URL . '?apikey=' . $this->apiKey . '&';
    }

    public function search(string $query): Response
    {
        return Http::get($this->getOmdbApiUrl() . 't=' . $query);
    }
}
