import { generateRandomEmail, generateRandomPassword } from '../utils/data';
import LoginResponse from '../models/api_models_abra';
import RegisterResponse from '../models/api_models_abra';
import { invalidEmails, invalidPasswords } from '../utils/data';
import { confirmEmailRegistration } from '../utils/registration';

describe('Login', () => {
    // POST /auth/sign-in WORKS: Вход пользователя (создание токена).
    it('login (valid email and password)', () => {
        // Создаем временный email
        cy.task('createTemporaryEmail').then((emailAddress) => {
            // Подтверждаем регистрацию
            return confirmEmailRegistration(emailAddress).then((password) => {
                cy.request({
                    method: 'POST', 
                    url: '/auth/sign-in', 
                    body: {
                        'email': emailAddress,
                        'password': password
                    }
                }).then((loginResponse) => {
                    cy.log(JSON.stringify(loginResponse));
                    expect(loginResponse.status).to.equal(200);
                    // Проверка заголовков ответа
                    expect(loginResponse.headers).to.have.property('content-type', 'application/json');
                    expect(loginResponse.headers['set-cookie']).to.be.an('array').and.have.lengthOf(2);
                    expect(LoginResponse.compare_models(loginResponse['body'], true)).to.equal(true);
                });
            });
        });
    });

    it('login with invalid email', () => {
        const randomPassword = generateRandomPassword();
        cy.log(`Generated password: ${randomPassword}`);
        cy.wrap(invalidEmails).each((email) => {
            cy.log(`Testing with email: ${email}`);
            cy.request({
                method: 'POST',
                url: '/auth/sign-in',
                failOnStatusCode: false,
                body: {
                    'email': email,
                    'password': randomPassword
                }
            }).then(loginResponse => {
                cy.log(JSON.stringify(loginResponse));
                expect(loginResponse.status).to.equal(422);
                expect(loginResponse.headers).to.have.property('content-type', 'application/json');
                expect(LoginResponse.compare_models(loginResponse.body, false)).to.equal(true);
            });
        });
    });

    it('login with invalid password', () => {
        const randomEmail = generateRandomEmail();
        cy.log(`Generated email address: ${randomEmail}`);
        cy.wrap(invalidPasswords).each((password) => {
            cy.log(`Testing with password: ${password}`);
            cy.request({
                method: 'POST',
                url: '/auth/sign-in',
                failOnStatusCode: false,
                body: {
                    'email': password,
                    'password': randomEmail
                }
            }).then(loginResponse => {
                cy.log(JSON.stringify(loginResponse));
                expect(loginResponse.status).to.equal(422);
                expect(loginResponse.headers).to.have.property('content-type', 'application/json');
                expect(LoginResponse.compare_models(loginResponse.body, false)).to.equal(true);
            });
        });
    });

    it('login with registred email and incorrect password', () => {
        // Создаем временный email
        cy.task('createTemporaryEmail').then((emailAddress) => {
            // Подтверждаем регистрацию
            return confirmEmailRegistration(emailAddress).then((password) => {
                cy.request({
                    method: 'POST', 
                    url: '/auth/sign-in', 
                    failOnStatusCode: false,
                    body: {
                        'email': emailAddress,
                        'password': 'incorrect'
                    }
                }).then((loginResponse) => {
                    cy.log(JSON.stringify(loginResponse));
                    expect(loginResponse.status).to.equal(403);
                    expect(loginResponse.headers).to.have.property('content-type', 'application/json');
                    expect(loginResponse.body).to.have.property('detail', 'Wrong email or password, maybe email was not confirmed or account was deleted?');
                });
            });
        });
    });

    it('login with registred but not confirmed email', () => {
        const randomEmail = generateRandomEmail();
        cy.log(`Generated email address: ${randomEmail}`);
        const randomPassword = generateRandomPassword();
        cy.log(`Generated password: ${randomPassword}`);

        // Первый запрос для регистрации
        cy.request('POST', '/auth/sign-up/supplier', {
            'email': randomEmail,
            'password': randomPassword
        }).then(response => {
            cy.log(`First registration response: ${JSON.stringify(response)}`);
            expect(response.status).to.equal(200);
            expect(RegisterResponse.compare_models(response['body'], true)).to.equal(true);
    
            // Добавление задержки перед повторным запросом, чтобы избежать ошибки
            // 'Database error: could not serialize access due to read/write dependencies among transactions'
            cy.wait(2000);

            //Попытка логина с тем же email и password
            const existingEmail = randomEmail;
            cy.log(`Attempting to login with the same email: ${existingEmail}`);
            const existingPassword = randomPassword;
            cy.log(`Attempting to login with the same password: ${existingPassword}`)
            cy.request({
                method: 'POST',
                url: '/auth/sign-in',
                failOnStatusCode: false,
                body: {
                    'email': existingEmail,
                    'password': existingPassword
                }
            }).then(loginResponse => {
                cy.log(`Second registration response: ${JSON.stringify(loginResponse)}`);
                expect(loginResponse.status).to.equal(403);
                expect(loginResponse.headers).to.have.property('content-type', 'application/json');
                expect(loginResponse.body).to.have.property('detail', 'Wrong email or password, maybe email was not confirmed or account was deleted?');
            });
        });
    });
});