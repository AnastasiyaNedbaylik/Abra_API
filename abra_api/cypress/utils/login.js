import LoginResponse from '../models/api_models_abra';
import { confirmEmailRegistration } from './registration';

export function registerAndLoginUser() {
    return cy.task('createTemporaryEmail').then((emailAddress) => {
        return confirmEmailRegistration(emailAddress).then((password) => {
            return cy.request({
                method: 'POST',
                url: '/auth/sign-in',
                body: {
                    email: emailAddress,
                    password: password,
                },
            }).then((loginResponse) => {
                expect(loginResponse.status).to.equal(200);
                expect(loginResponse.headers).to.have.property('content-type', 'application/json');
                expect(loginResponse.headers['set-cookie']).to.be.an('array').and.have.lengthOf(2);

                // Извлечение cookies из заголовков
                const accessTokenCookie = loginResponse.headers['set-cookie'].find((cookie) =>
                    cookie.includes('access_token_cookie')
                ).split(';')[0].split('=')[1];
                
                const refreshTokenCookie = loginResponse.headers['set-cookie'].find((cookie) =>
                    cookie.includes('refresh_token_cookie')
                ).split(';')[0].split('=')[1];

                // Установка cookies для последующего использования
                cy.setCookie('access_token_cookie', accessTokenCookie);
                cy.setCookie('refresh_token_cookie', refreshTokenCookie);

                cy.wrap(LoginResponse.compare_models(loginResponse.body, true)).should('equal', true);
            });
        });
    });
}