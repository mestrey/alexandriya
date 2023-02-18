<?php

namespace App\Exceptions\Authentication;

use App\Exceptions\MessagedException;

class UnauthorizedException extends MessagedException
{
    public function __construct()
    {
        parent::__construct('unauthorized', 401);
    }
}
