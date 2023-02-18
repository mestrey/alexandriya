import { Component, createSignal } from "solid-js";
import AuthenticationService from "../services/AuthenticationService";

const Login: Component = () => {
    const [getUsername, setUsername] = createSignal('');
    const [getPassword, setPassword] = createSignal('');

    const formSubmit = (event: Event) => {
        event.preventDefault();

        AuthenticationService.login({
            username: getUsername(),
            password: getPassword(),
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <form onsubmit={formSubmit}>
                <div>
                    <label for='username'>Username:</label>
                    <br />
                    <input
                        type='text'
                        id='username'
                        value={getUsername()}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label for='password'>Password:</label>
                    <br />
                    <input
                        type='password'
                        id='password'
                        value={getPassword()}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;