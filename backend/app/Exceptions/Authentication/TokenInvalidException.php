<?php

namespace App\Exceptions\Authentication;

use App\Exceptions\MessagedException;

class TokenInvalidException extends MessagedException
{
    public function __construct()
    {
        parent::__construct('token_invalid', 401);
    }
}
