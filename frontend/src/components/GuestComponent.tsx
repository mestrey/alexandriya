import { Outlet } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import AuthenticationService from '../services/AuthenticationService';

const Guest: Component = () => {
    return (
        <Show when={!AuthenticationService.isLogged()} fallback={window.location.href = '/'}>
            <Outlet />
        </Show>
    );
};

export default Guest;