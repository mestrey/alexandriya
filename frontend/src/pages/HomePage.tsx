import { Component, Show } from 'solid-js';
import AuthenticationService from '../services/AuthenticationService';
import UserService from '../services/UserService';

const HomePage: Component = () => {
    const isLogged = AuthenticationService.isLogged();

    if (isLogged) {
        // UserService.getUserData().then((r) => r.json().then(e => console.log(e)));
    }

    return (
        <div>
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