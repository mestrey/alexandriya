import { AUTH_SAVE_KEY } from '../utils/constants';
import HttpClientService from './HttpClientService';

type Tokens = {
    token: string,
    refresh_token: string,
};

class AuthenticationService {
    private authSaveKey: string;

    public constructor(authSaveKey: string) {
        this.authSaveKey = authSaveKey;
    }

    public isLogged(): boolean {
        return !!localStorage.getItem(this.authSaveKey);
    }

    public getTokens(): Tokens {
        return JSON.parse(localStorage.getItem(this.authSaveKey)!);
    }

    public setTokens(tokens: object): void {
        return localStorage.setItem(this.authSaveKey, JSON.stringify(tokens));
    }

    public login(data: object): Promise<Response> {
        return HttpClientService.post(['auth', 'login'], data);
    }

    public register(data: object): Promise<Response> {
        return HttpClientService.post(['auth', 'register'], data);
    }
}

export default new AuthenticationService(AUTH_SAVE_KEY);
