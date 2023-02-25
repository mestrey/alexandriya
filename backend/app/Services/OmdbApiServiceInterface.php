<?php

namespace App\Services;

use Illuminate\Http\Client\Response;

interface OmdbApiServiceInterface
{
    public function __construct(string $apiKey);

    public function search(string $query): Response;
}
