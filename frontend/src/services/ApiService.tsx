import { SERVER_API_URL } from '../utils/constants';

export namespace ApiService {
    class Core {
        public static fetch(
            categories: string[],
            route: string,
            method: string,
            data: object,
            token: string | null = null,
        ): Promise<Response> {
            return fetch(
                `${SERVER_API_URL}/${categories.join('/')}/${route}`,
                {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token ? 'Bearer ' + token : '',
                    },
                    body: JSON.stringify(data),
                }
            );
        }
    }

    export class Authentication {
        private fetch(
            route: string, method: string, data: object, token: string | null = null,
        ): Promise<Response> {
            return Core.fetch(['auth'], route, method, data);
        }

        public login(data: object) {
            return this.fetch('login', 'POST', data);
        }

        public register(data: object) {
            return this.fetch('register', 'POST', data);
        }

        public logout() {
            // return this.fetch('register', 'POST', {}, );
        }
    }

    export class User {
        private fetch(
            route: string, method: string, data: object
        ): Promise<Response> {
            return Core.fetch(['user'], route, method, data);
        }

        // public show() {
        //     return this.fetch('show', 'GET', {});
        // }
    }
}

export const AuthenticationApiService = new ApiService.Authentication();
export const UserApiService = new ApiService.User();