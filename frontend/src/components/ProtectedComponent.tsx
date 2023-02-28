import { Outlet } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import AuthenticationService from '../services/AuthenticationService';

const Protected: Component = () => {
    const unauthorized = () => {
        window.location.href = '/login';

        return <p>Unauthorized, redirect...</p>
    };

    return (
        <Show when={AuthenticationService.isLogged()} fallback={unauthorized()}>
            <Outlet />
        </Show>
    );
};

export default Protected;