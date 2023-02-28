import { Component, createSignal } from 'solid-js';
import UserService from '../services/UserService';

const AccountPage: Component = () => {
    const [getUserData, setUserData] = createSignal();

    UserService.getUserData().then((response) => response!.json().then((data: any) => {
        setUserData(data);
    }));

    return (
        <div>
            <a href='/'>home</a>
        </div>
    );
};

export default AccountPage;