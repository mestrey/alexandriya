import { Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';
import Protected from './components/ProtectedComponent';
import AuthPage, { AuthType } from './pages/AuthPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const App: Component = () => {
    return (
        <div>
            <Routes>
                <Route path='*' element={<NotFoundPage />}></Route>
                <Route path='/' element={<HomePage />}></Route>

                <Route path='login' element={<AuthPage type={AuthType.Login} />}></Route>
                <Route path='register' element={<AuthPage type={AuthType.Register} />}></Route>

                <Route path='' component={Protected}>
                </Route>
            </Routes>
        </div >
    );
};

export default App;
