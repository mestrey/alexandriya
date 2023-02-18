<?php

namespace App\Exceptions;

class MessagedException extends \Exception
{
    public function __construct(string $messageCode = '', int $code = 0)
    {
        parent::__construct(app()->get('exceptionsMessages')[$messageCode], $code);
    }
}
