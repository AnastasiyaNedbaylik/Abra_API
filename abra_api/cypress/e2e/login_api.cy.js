import { generateRandomEmail, generateRandomPassword } from '../utils/data';
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
        cy.log('Generated password:', randomPassword);
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
                expect(LoginResponse.compare_models(loginResponse.body, false)).to.equal(true);
            });
        });
    });

    it('login with invalid password', () => {
        const randomEmail = generateRandomEmail();
        cy.log('Generated email address:', randomEmail);
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
                expect(LoginResponse.compare_models(loginResponse.body, false)).to.equal(true);
            });
        });
    });

    it('login registred email and incorrect password)', () => {
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
                    expect(loginResponse.body).to.have.property('detail', 'Wrong email or password, maybe email was not confirmed or account was deleted?');
                });
            });
        });
    });
});