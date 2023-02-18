<?php

namespace App\Providers;

use App\Repositories\UserRepository;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        app()->instance(
            'exceptionsMessages',
            include(app()->langPath() . '/' . app()->getLocale() . '/exceptions.php')
        );
    }

    public function register()
    {
        $this->app->singleton(UserRepositoryInterface::class, UserRepository::class);
    }
}
