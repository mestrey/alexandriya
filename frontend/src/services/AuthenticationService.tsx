import { AUTH_SAVE_KEY } from "../utils/constants";

class AuthenticationService {
    private authSaveKey: string;

    public constructor(authSaveKey: string) {
        this.authSaveKey = authSaveKey;
    }

    public isLogged(): boolean {
        return !!localStorage.getItem(this.authSaveKey);
    }

    public getTokens(): object {
        return JSON.parse(localStorage.getItem(this.authSaveKey)!);
    }

    public setTokens(tokens: object): void {
        return localStorage.setItem(this.authSaveKey, JSON.stringify(tokens));
    }
}

export default new AuthenticationService(AUTH_SAVE_KEY);
