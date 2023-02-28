import { Component, createSignal, Show } from 'solid-js';
import AuthenticationService from '../services/AuthenticationService';

const HomePage: Component = () => {
    const isLogged = AuthenticationService.isLogged();

    return (
        <div>
            <div>
                <Show when={isLogged}>
                    <p>search</p>
                    <input type='text' />
                </Show>
                <Show when={!isLogged}>
                    <a href='login'>login</a>
                </Show>
            </div>
            <div>
                <p>Made by YSK corporation</p>
            </div>
        </div>
    );
};

export default HomePage;