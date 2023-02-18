<?php

$router->group(['prefix' => 'auth'], function () use ($router) {
    $router->post('register', 'AuthenticationController@register');
    $router->post('login', 'AuthenticationController@login');
    $router->post('refresh', 'AuthenticationController@refresh');
    $router->get('logout', [
        'middleware' => 'auth',
        'uses' => 'AuthenticationController@logout',
    ]);
});

$router->get('/', function () use ($router) {
    return $router->app->version();
});
