<?php

namespace App\Services;

class OmdbApiService implements OmdbApiServiceInterface
{
    public function __construct(
        private string $apiKey,
    ) {
    }
}
