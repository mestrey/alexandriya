import { Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';
import Protected from './components/ProtectedComponent';
import NotFoundPage from './pages/NotFoundPage';

const App: Component = () => {
    return (
        <div>
            <Routes>
                <Route path='*' element={<NotFoundPage />}></Route>
                <Route path='/' element={<div>home</div>}></Route>

                <Route path='' component={Protected}>
                </Route>
            </Routes>
        </div >
    );
};

export default App;
