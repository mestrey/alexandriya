import { Component } from 'solid-js';

const FooterComponent: Component = () => {
    return (
        <footer class='bg-dark p-4 text-light'>
            <div class='container'>
                <div class='row'>
                    <div class='col-6'>
                        <p>Alexandriya</p>
                    </div>
                    <div class='col-6 text-end'>
                        <p>Made by YSK corporation</p>
                        <a href='#top'>Back to top page</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;