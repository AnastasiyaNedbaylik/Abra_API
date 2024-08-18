import { generateRandomEmail } from '../utils/data';
import LoginResponse from '../models/api_models_abra';
import СonfirmationResponse from '../models/api_models_abra';
import { invalidEmails, invalidPasswords } from '../utils/data';
import { confirmEmailRegistration } from '../utils/registration';

describe('Login', () => {
    // POST /auth/sign-in WORKS: Вход пользователя (создание токена).
    it('login (valid email and password)', () => {
        // Создаем временный email
        cy.task('createTemporaryEmail').then((emailAddress) => {
            // Подтверждаем регистрацию
            return confirmEmailRegistration(emailAddress).then((password) => {
                cy.request('POST', '/auth/sign-in', {
                    'email': emailAddress,
                    'password': password
                }).then((loginResponse) => {
                    cy.log(JSON.stringify(loginResponse));
                    expect(loginResponse.status).to.equal(200);
                    expect(LoginResponse.compare_models(loginResponse['body'], true)).to.equal(true);
                    // Проверка заголовков ответа
                    expect(loginResponse.headers).to.have.property('content-type', 'application/json');
                    expect(loginResponse.headers['set-cookie']).to.be.an('array').and.have.lengthOf(2);
                });
            });
        });
    });
});