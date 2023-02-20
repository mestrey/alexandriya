<?php

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'auth'], function () use ($router) {
    $router->post('register', 'AuthenticationController@register');
    $router->post('login', 'AuthenticationController@login');
    $router->post('refresh', 'AuthenticationController@refresh');
    $router->get('logout', [
        'middleware' => 'auth',
        'uses' => 'AuthenticationController@logout',
    ]);
});

$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->group(['prefix' => 'user'], function () use ($router) {
        $router->get('show', 'UserController@show');
    });

    $router->group(['prefix' => 'movie'], function () use ($router) {
        $router->get('search/{query}', 'MovieController@search');
    });

    $router->group(['prefix' => 'fav'], function () use ($router) {
        $router->post('create', 'FavoriteController@create');
        $router->get('destroy/{id}', 'FavoriteController@destroy');
    });
});
