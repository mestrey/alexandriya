import AuthenticationService from './AuthenticationService';
import HttpClientService from './HttpClientService';

class UserService {
    public getUserData(): Promise<Response> {
        return HttpClientService.get(
            ['user', 'show'],
            AuthenticationService.getTokens().token
        );
    }
}

export default new UserService();