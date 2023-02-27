import AuthenticationService from "./AuthenticationService";

class SecurityService {
    private readonly EXPIRED_TOKEN_CODE = 498;

    public async handle(request: () => Promise<Response>): Promise<any> {
        const response = await request();

        const failedHandle = () => {
            AuthenticationService.logout();
            window.location.href = '/';
        };

        if (!response.ok) {
            const errorResponse = await response.json();

            if (errorResponse.error.code !== this.EXPIRED_TOKEN_CODE) {
                failedHandle();
                return;
            }

            const resfreshReponse = await AuthenticationService.refresh();

            if (!resfreshReponse.ok) {
                failedHandle();
                return;
            }

            const refreshedTokens = await resfreshReponse.json();
            AuthenticationService.setTokens(refreshedTokens);

            return this.handle(request);
        } else {
            return response;
        }
    }
}

export default new SecurityService();