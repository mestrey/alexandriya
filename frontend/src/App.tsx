import { Navigate, Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';
import Guest from './components/GuestComponent';
import Protected from './components/ProtectedComponent';
import AccountPage from './pages/AccountPage';
import AuthPage, { AuthType } from './pages/AuthPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AuthenticationService from './services/AuthenticationService';

const App: Component = () => {
    return (
        <div>
            <Routes>
                <Route path='*' element={<NotFoundPage />}></Route>
                <Route path='/' element={<HomePage />}></Route>

                <Route path='' component={Guest}>
                    <Route path='login' element={<AuthPage type={AuthType.Login} />}></Route>
                    <Route path='register' element={<AuthPage type={AuthType.Register} />}></Route>
                </Route>

                <Route path='' component={Protected}>
                    <Route path='/logout' element={<Navigate href={({ }) => {
                        AuthenticationService.logout();

                        return '/';
                    }} />}></Route>

                    <Route path='account' element={<AccountPage />}></Route>
                </Route>
            </Routes>
        </div >
    );
};

export default App;
