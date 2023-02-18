<?php

namespace App\Exceptions\Authentication;

use App\Exceptions\MessagedException;

class TokenNotFoundException extends MessagedException
{
    public function __construct()
    {
        parent::__construct('token_not_found', 404);
    }
}
