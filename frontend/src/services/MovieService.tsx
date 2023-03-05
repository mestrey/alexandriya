import AuthenticationService from "./AuthenticationService";
import HttpClientService from "./HttpClientService";
import SecurityService from "./SecurityService";

class MovieService {
    public search(query: string) {
        return SecurityService.handle(() => HttpClientService.get(
            ['movie', 'search', query],
            AuthenticationService.getTokens().token
        ));
    }
}

export default new MovieService();