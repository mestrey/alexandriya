<?php

namespace App\Exceptions\Authentication;

use App\Exceptions\MessagedException;

class TokenValidException extends MessagedException
{
    public function __construct()
    {
        parent::__construct('token_valid', 406);
    }
}
