import AuthenticationService from './AuthenticationService';
import HttpClientService from './HttpClientService';
import SecurityService from './SecurityService';

class UserService {
    public getUserData() {
        return SecurityService.handle(() => HttpClientService.get(
            ['user', 'show'],
            AuthenticationService.getTokens().token
        ));
    }
}

export default new UserService();