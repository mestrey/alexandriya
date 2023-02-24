import { Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';

const App: Component = () => {
    return (
        <div>
            <Routes>
                <Route path='*' element={<div>404 not found</div>}></Route>
            </Routes>
        </div>
    );
};

export default App;
