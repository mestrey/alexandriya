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
        localStorage.setItem(this.authSaveKey, JSON.stringify(tokens));
    }

    public login(data: object): Promise<Response> {
        return HttpClientService.post(['auth', 'login'], data);
    }

    public register(data: object): Promise<Response> {
        return HttpClientService.post(['auth', 'register'], data);
    }

    public logout(): void {
        HttpClientService.get(['auth', 'logout'], this.getTokens().token);
        localStorage.removeItem(this.authSaveKey);
    }

    public refresh(): Promise<Response> {
        return HttpClientService.post(['auth', 'refresh'], this.getTokens());
    }
}

export default new AuthenticationService(AUTH_SAVE_KEY);
