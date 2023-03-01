import { Navigate, Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';
import FooterComponent from './components/FooterComponent';
import Guest from './components/GuestComponent';
import NavbarComponent from './components/NavbarComponent';
import Protected from './components/ProtectedComponent';
import AccountPage from './pages/AccountPage';
import AuthPage, { AuthType } from './pages/AuthPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import AuthenticationService from './services/AuthenticationService';

const App: Component = () => {
    return (
        <div>
            <NavbarComponent />

            <Routes>
                <Route path='*' element={<NotFoundPage />}></Route>
                <Route path='/' element={<HomePage />}></Route>

                <Route path='' component={Guest}>
                    <Route path='login' element={<AuthPage type={AuthType.Login} />}></Route>
                    <Route path='register' element={<AuthPage type={AuthType.Register} />}></Route>
                </Route>

                <Route path='' component={Protected}>
                    <Route path='logout' element={<Navigate href={({ }) => {
                        AuthenticationService.logout();
                        window.location.href = '/';

                        return '';
                    }} />}></Route>

                    <Route path='account' element={<AccountPage />}></Route>
                    <Route path='search' element={<SearchPage />}></Route>
                </Route>
            </Routes>

            <FooterComponent />
        </div >
    );
};

export default App;
