import { Component, createSignal } from "solid-js";
import AuthenticationService from "../services/AuthenticationService";

const Register: Component = () => {
    const [getUsername, setUsername] = createSignal('');
    const [getEmail, setEmail] = createSignal('');
    const [getPassword, setPassword] = createSignal('');

    const formSubmit = (event: Event) => {
        event.preventDefault();

        AuthenticationService.register({
            username: getUsername(),
            email: getEmail(),
            password: getPassword(),
        });
    };

    return (
        <div>
            <h1>Register</h1>
            <form onsubmit={formSubmit}>
                <div>
                    <label for='username'>Username:</label>
                    <input
                        type='text' id='username' value={getUsername()}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label for='email'>Email:</label>
                    <input
                        type='email' id='Email' value={getEmail()}
                        onChange={(e) => setEmail(e.currentTarget.value)}
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
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;