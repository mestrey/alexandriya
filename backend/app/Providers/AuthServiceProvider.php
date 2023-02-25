<?php

namespace App\Providers;

use App\Repositories\AuthAccessRepository;
use App\Repositories\AuthAccessRepositoryInterface;
use App\Services\AuthAccessService;
use App\Services\AuthAccessServiceInterface;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function boot()
    {
    }

    public function register()
    {
        $this->app->singleton(AuthAccessServiceInterface::class, function () {
            return new AuthAccessService(
                env('AUTH_TOKEN_SECRET'),
                env('AUTH_REFRESH_TOKEN_SECRET'),
                env('AUTH_TOKEN_EXP_MIN'),
                env('AUTH_REFRESH_TOKEN_EXP_MIN')
            );
        });

        $this->app->singleton(AuthAccessRepositoryInterface::class, AuthAccessRepository::class);
    }
}
