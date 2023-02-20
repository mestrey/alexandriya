<?php

namespace App\Exceptions\Favorite;

use App\Exceptions\MessagedException;

class FavoriteNotFoundException extends MessagedException
{
    public function __construct()
    {
        parent::__construct('favorite_not_found', 404);
    }
}
