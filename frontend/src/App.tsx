import { Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';

import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

const App: Component = () => {
    return (
        <div>
            <Routes>
                <Route path='*' element={<NotFound />}></Route>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </div>
    );
};

export default App;
