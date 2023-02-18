import { AUTHENTICATION_SAVE_KEY } from "../utils/constants";
import { AuthenticationApiService } from "./ApiService";

class AuthenticationService {
    private saveTokens(tokens: object) {
        localStorage.setItem(AUTHENTICATION_SAVE_KEY, JSON.stringify(tokens));
    }

    public async login(data: object) {
        const content = await AuthenticationApiService.login(data)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .catch(() => console.log('An error occured.'));

        this.saveTokens(content);

        window.location.href = '/';
    }

    public async register(data: object) {
        const content = await AuthenticationApiService.register(data)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .catch(() => console.log('An error occured.'));

        this.saveTokens(content);

        window.location.href = '/';
    }
}

export default new AuthenticationService();
