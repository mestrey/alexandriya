import { Outlet } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import AuthenticationService from '../services/AuthenticationService';

const Guest: Component = () => {
    const authorized = () => {
        window.location.href = '/';

        return <p>Already logged in, redirect...</p>
    };

    return (
        <Show when={!AuthenticationService.isLogged()} fallback={authorized()}>
            <Outlet />
        </Show>
    );
};

export default Guest;