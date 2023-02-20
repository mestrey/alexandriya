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

    protected $hidden = [
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

    public function getFavorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
