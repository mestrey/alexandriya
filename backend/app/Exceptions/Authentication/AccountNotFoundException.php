<?php

namespace App\Exceptions\Authentication;

use App\Exceptions\MessagedException;

class AccountNotFoundException extends MessagedException
{
    public function __construct()
    {
        parent::__construct('account_not_found', 404);
    }
}
