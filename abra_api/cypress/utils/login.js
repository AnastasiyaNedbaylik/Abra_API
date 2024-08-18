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
                // Убедитесь, что мы возвращаем только асинхронные операции
                cy.wrap(loginResponse).then((response) => {
                    const accessTokenCookie = response.headers['set-cookie'].find((cookie) =>
                        cookie.includes('access_token_cookie')
                    ).split(';')[0].split('=')[1];
                    
                    const refreshTokenCookie = response.headers['set-cookie'].find((cookie) =>
                        cookie.includes('refresh_token_cookie')
                    ).split(';')[0].split('=')[1];

                    // Устанавливаем cookies для последующего использования
                    cy.setCookie('access_token_cookie', accessTokenCookie);
                    cy.setCookie('refresh_token_cookie', refreshTokenCookie);

                    // Проверка успешного ответа и структуры данных
                    expect(response.status).to.equal(200);
                    expect(response.headers).to.have.property('content-type', 'application/json');
                    expect(response.headers['set-cookie']).to.be.an('array').and.have.lengthOf(2);
                    cy.wrap(LoginResponse.compare_models(response.body, true)).should('equal', true);

                    // Возвращаем email и пароль для последующего использования
                    return { emailAddress, password };
                });
            });
        });
    });
}