<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    public function getId()
    {
        return $this->attributes['id'];
    }

    public function getPassword()
    {
        return $this->attributes['password'];
    }
}
