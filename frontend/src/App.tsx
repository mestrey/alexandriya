import { Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';

import Home from './pages/Home';
import Login from './pages/Login';

const App: Component = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </div>
    );
};

export default App;
