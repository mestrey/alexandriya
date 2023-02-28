import { Component, createSignal, Show } from 'solid-js';
import AuthenticationService from '../services/AuthenticationService';
import UserService from '../services/UserService';

const HomePage: Component = () => {
    const isLogged = AuthenticationService.isLogged();

    const [getUsername, setUsername] = createSignal('');

    if (isLogged) {
        UserService.getUserData().then((response) => response!.json().then((data: any) => {
            setUsername(data.username);
        }));
    }

    return (
        <div>
            <div>
                <Show when={isLogged}>
                    <a href='account'>{getUsername()}</a>
                </Show>
            </div>
            <div>
                <Show when={isLogged}>
                    <p>search</p>
                    <input type="text" />
                </Show>
                <Show when={!isLogged}>
                    <a href="login">login</a>
                </Show>
            </div>
            <div>
                <p>Made by YSK corporation</p>
            </div>
        </div>
    );
};

export default HomePage;