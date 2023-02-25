import { Component, createSignal, Show } from 'solid-js'
import AuthenticationService from '../services/AuthenticationService';

export enum AuthType {
    Login, Register
};

const AuthPage: Component = (props: any) => {
    const [getUsername, setUsername] = createSignal('');
    const [getEmail, setEmail] = createSignal('');
    const [getPassword, setPassword] = createSignal('');

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

        console.log(response);

        // const response = await AuthenticationService.login({
        //     username: getUsername(),
        //     password: getPassword(),
        // });

        // if (response === true) {
        //     console.log('good', response);
        //     // window.location.href = '/';
        // } else {
        //     console.log('err', response);
        // }
    };


    return (
        <div>
            <form onsubmit={formSubmit}>
                <div>
                    <label for='username'>Username:</label>
                    <input
                        type='text' id='username' value={getUsername()}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                </div>
                <Show when={!isLogin}>
                    <div>
                        <label for='email'>Email:</label>
                        <input
                            type='email' id='email' value={getEmail()}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </div>
                </Show>
                <div>
                    <label for='password'>Password:</label>
                    <input
                        type='password' id='password' value={getPassword()}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button type="submit">
                        <Show when={isLogin} fallback="Register">Login</Show>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AuthPage;