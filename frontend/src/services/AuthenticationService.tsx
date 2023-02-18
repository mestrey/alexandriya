import { AuthenticationApiService } from "./ApiService";

class AuthenticationService {
    public async login(data: object) {
        const content = await AuthenticationApiService.login(data)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .catch((e: Response) => console.log('An error occured.'));

        return content;
    }
}

export default new AuthenticationService();
