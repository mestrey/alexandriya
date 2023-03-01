import { Component, createSignal, Show } from 'solid-js';
import AuthenticationService from '../services/AuthenticationService';
import UserService from '../services/UserService';

const NavbarComponent: Component = () => {
    const isLogged = AuthenticationService.isLogged();

    const [getUsername, setUsername] = createSignal('');

    if (isLogged) {
        UserService.getUserData().then((response) => response!.json().then((data: any) => {
            setUsername(data.username);
        }));
    }

    return (
        <nav class='navbar navbar-expand-sm navbar-dark bg-primary p-2'>
            <div class='container-fluid'>
                <a class='navbar-brand' href='/'><strong>🍿 Alexandriya</strong></a>
                <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarColor01' aria-controls='navbarColor01' aria-expanded='false' aria-label='Toggle navigation'>
                    <span class='navbar-toggler-icon'></span>
                </button>
                <div class='collapse navbar-collapse' id='navbarColor01'>
                    <ul class='navbar-nav me-auto'>
                        <li class='nav-item'>
                            <a class='nav-link active' href='/'>Home</a>
                        </li>
                        <li class='nav-item'>
                            <a class='nav-link active' href='search'>Search</a>
                        </li>
                    </ul>
                    <ul class='navbar-nav ml-auto'>
                        <Show when={isLogged}>
                            <li class='nav-item'>
                                <a class='nav-link active' href='account'>{getUsername()}</a>
                            </li>
                            <li class='nav-item'>
                                <a class='nav-link active' href='logout'>Logout</a>
                            </li>
                        </Show>
                        <Show when={!isLogged}>
                            <li class='nav-item'>
                                <a class='nav-link active' href='login'>Login</a>
                            </li>
                            <li class='nav-item'>
                                <a class='nav-link active' href='register'>Register</a>
                            </li>
                        </Show>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;