<?php

namespace App\Services;

interface OmdbApiServiceInterface
{
    public function __construct(string $apiKey);
}
