import { AUTHENTICATION_SAVE_KEY } from "../utils/constants";
import { AuthenticationApiService } from "./ApiService";

class AuthenticationService {
    private saveTokens(tokens: object) {
        localStorage.setItem(AUTHENTICATION_SAVE_KEY, JSON.stringify(tokens));
    }

    private saveOrError(response: object | null, tokens: object): object | boolean {
        if (response) {
            return response;
        } else {
            this.saveTokens(tokens);

            return true;
        }
    }

    public async login(data: object) {
        let errorResponse: object | null = null;

        const content = await AuthenticationApiService.login(data)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .catch(async (error: Response) => {
                errorResponse = await error.json();
            });

        return this.saveOrError(errorResponse, content);
    }

    public async register(data: object) {
        let errorResponse: object | null = null;

        const content = await AuthenticationApiService.register(data)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .catch(async (error: Response) => {
                errorResponse = await error.json();
            });

        return this.saveOrError(errorResponse, content);
    }

    public logout() {
        // const 
    }
}

export default new AuthenticationService();
