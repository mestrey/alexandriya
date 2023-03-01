import { Component } from 'solid-js';

const NotFoundPage: Component = () => {
    return (
        <div class='text-center p-4'>
            <h1 class='pb-4'><strong>Error 404</strong></h1>
            <h4>Page not found!</h4>
            <a href="/">Go to the home page</a>
        </div>
    );
};

export default NotFoundPage;