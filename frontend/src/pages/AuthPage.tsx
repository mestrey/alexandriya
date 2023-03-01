import { Component, createSignal, Show } from 'solid-js'
import AuthenticationService from '../services/AuthenticationService';

export enum AuthType {
    Login, Register
};

const AuthPage: Component = (props: any) => {
    const [getUsername, setUsername] = createSignal('');
    const [getEmail, setEmail] = createSignal('');
    const [getPassword, setPassword] = createSignal('');

    const [getError, setError] = createSignal('');

    const isLogin = props.type === AuthType.Login;

    const formSubmit = async (event: Event) => {
        event.preventDefault();

        const data = {
            username: getUsername(),
            email: getEmail(),
            password: getPassword(),
        };

        const response = await (isLogin ?
            AuthenticationService.login(data) :
            AuthenticationService.register(data));

        if (response.ok) {
            const tokens = await response.text();
            AuthenticationService.setTokens(JSON.parse(tokens));
            window.location.href = '/';
        } else {
            const errorResponse: any = await response.json();
            setError(`Error code ${errorResponse.error.code}: ${errorResponse.error.message}`)
        }
    };


    return (
        <div class='text-left container'>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-6">
                    <div class='text-center'>
                        <h1 class='p-4'>
                            <strong>
                                {isLogin ? 'Login' : 'Register'}
                            </strong>
                        </h1>
                    </div>
                    <form onsubmit={formSubmit}>
                        <div class='mb-3'>
                            <label for='username' class='form-label'>Username</label>
                            <input type='text' class='form-control' id='username' aria-describedby='usernameInfo'
                                value={getUsername()} onChange={(e) => setUsername(e.currentTarget.value)}
                            />
                            <div id='usernameInfo' class='form-text'>
                                Your username must be 2-30 characters long and unique.
                            </div>
                        </div>
                        <Show when={!isLogin}>
                            <div class='mb-3'>
                                <label for='email' class='form-label'>Email address</label>
                                <input type='email' class='form-control' id='email' aria-describedby='emailInfo'
                                    value={getEmail()} onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                                <div id='emailInfo' class='form-text'>
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                        </Show>
                        <div class='mb-3'>
                            <label for='password' class='form-label'>Password</label>
                            <input type='password' class='form-control' id='password' aria-describedby='passwordInfo'
                                value={getPassword()} onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                            <div id='passwordInfo' class='form-text'>
                                Your password must be 6 characters long minimum.
                            </div>
                        </div>
                        <div class='text-center text-danger'>
                            <p>{getError()}</p>
                        </div>
                        <div class='text-center'>
                            <button type='submit' class='btn btn-primary'>
                                {isLogin ? 'Login' : 'Register'}
                            </button>
                            <p class='pt-3'>
                                <a href={isLogin ? 'register' : 'login'}>
                                    {isLogin ? 'Register' : 'Login'} instead?
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
    );
};

export default AuthPage;