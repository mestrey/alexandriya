import { Component } from 'solid-js';

const FooterComponent: Component = () => {
    return (
        <div>
            <div style={{ 'clear': 'both', 'height': '136px' }}></div>
            <footer class='bg-dark p-4 text-light fixed-bottom'>
                <div class='container'>
                    <div class='row'>
                        <div class='col-6'>
                            <p class='text-uppercase'><strong>🍿 Alexandriya</strong></p>
                        </div>
                        <div class='col-6 text-end'>
                            <p>Made by YSK corporation</p>
                            <a href='#top'>Back to top</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FooterComponent;