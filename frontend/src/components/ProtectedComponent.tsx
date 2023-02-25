import { Outlet } from "@solidjs/router";
import { Component, Show } from "solid-js";
import AuthenticationService from "../services/AuthenticationService";

const Protected: Component = () => {
    return (
        <Show when={AuthenticationService.isLogged()} fallback={<p>not auth</p>}>
            <Outlet />
        </Show>
    );
};

export default Protected;