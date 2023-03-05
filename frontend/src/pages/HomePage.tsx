import { Component, createSignal, Show } from 'solid-js';
import SearchBarComponent from '../components/SearchBarComponent';
import AuthenticationService from '../services/AuthenticationService';

const HomePage: Component = () => {
    const isLogged = AuthenticationService.isLogged();

    return (
        <div>
            <section>
                <div class='text-center p-4 bg-dark text-light'>
                    <div class='p-4 m-4'>
                        <h1 class='text-uppercase pt-4'><strong>Alexan🍿driya</strong></h1>
                        <h6 class='pb-4'><i>The Movie Library</i></h6>
                    </div>
                </div>
            </section>
            <section class='bg-light'>
                <div class='container p-4'>
                    <div class='row'>
                        <div class='col-sm-3'></div>
                        <div class='col-md-6 text-center'>
                            <Show when={isLogged}>
                                <h4>Search</h4>
                                <SearchBarComponent />
                            </Show>
                            <Show when={!isLogged}>
                                Please <a href='login'>login</a> for making search!
                            </Show>
                        </div>
                        <div class='col-sm-3'></div>
                    </div>
                </div>
            </section>
            <section>
                ...
            </section>
        </div>
    );
};

export default HomePage;