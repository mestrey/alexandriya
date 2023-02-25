<?php

namespace App\Providers;

use App\Repositories\UserRepository;
use App\Repositories\UserRepositoryInterface;
use App\Services\OmdbApiService;
use App\Services\OmdbApiServiceInterface;
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

        $this->app->singleton(OmdbApiServiceInterface::class, function () {
            return new OmdbApiService(env('OMDB_API_KEY'));
        });
    }
}
