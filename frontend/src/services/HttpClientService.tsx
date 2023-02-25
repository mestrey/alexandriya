import { SERVER_API_URL } from '../utils/constants';

class HttpClientService {
    private serverApiUrl: string;

    public constructor(serverApiUrl: string) {
        this.serverApiUrl = serverApiUrl;
    }

    public get(routes: string[], token: string | null = null): Promise<Response> {
        return fetch(`${this.serverApiUrl}/${routes.join('/')}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? 'Bearer ' + token : '',
            },
        });
    }

    public post(routes: string[], body: object, token: string | null = null): Promise<Response> {
        return fetch(`${this.serverApiUrl}/${routes.join('/')}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token ? 'Bearer ' + token : '',
            },
            body: JSON.stringify(body),
        });
    }
}

export default new HttpClientService(SERVER_API_URL);