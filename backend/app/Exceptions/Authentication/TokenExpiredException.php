<?php

namespace App\Exceptions\Authentication;

use App\Exceptions\MessagedException;

class TokenExpiredException extends MessagedException
{
    public function __construct()
    {
        parent::__construct('token_expired', 498);
    }
}
