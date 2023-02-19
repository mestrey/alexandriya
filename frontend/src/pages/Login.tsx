import { Component, createSignal } from "solid-js";
import AuthenticationService from "../services/AuthenticationService";

const Login: Component = () => {
    const [getUsername, setUsername] = createSignal('');
    const [getPassword, setPassword] = createSignal('');

    const formSubmit = async (event: Event) => {
        event.preventDefault();

        const response = await AuthenticationService.login({
            username: getUsername(),
            password: getPassword(),
        });

        if (response === true) {
            console.log('good', response);
            // window.location.href = '/';
        } else {
            console.log('err', response);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onsubmit={formSubmit}>
                <div>
                    <label for='username'>Username:</label>
                    <input
                        type='text' id='username' value={getUsername()}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label for='password'>Password:</label>
                    <input
                        type='password' id='password' value={getPassword()}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;