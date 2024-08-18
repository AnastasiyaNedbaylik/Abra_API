import { generateRandomEmail, generateRandomPassword } from '../utils/data';
import RegisterResponse from '../models/api_models_abra';
import СonfirmationResponse from '../models/api_models_abra';
import { invalidEmails, invalidPasswords } from '../utils/data';

describe('Register Suplier', () => {
    //POST /auth/sign-up/{user_type} WORKS: User registration. (supplier)

    it('positive (valid email and password)', () => {
        const randomEmail = generateRandomEmail();
        cy.log(`Generated email address: ${randomEmail}`);
        const randomPassword = generateRandomPassword();
        cy.log(`Generated password: ${randomPassword}`);
        cy.request('POST', '/auth/sign-up/supplier' , {
            'email': randomEmail,
            'password': randomPassword
        }).then(response => {
            cy.log(JSON.stringify(response));
            expect(response['status']).to.equal(200);
            expect(RegisterResponse.compare_models(response['body'], true)).to.equal(true);
        });
    });

    it('invalid password', () => {
        const randomEmail = generateRandomEmail();
        cy.log(`Generated email address: ${randomEmail}`);
        cy.wrap(invalidPasswords).each((password) => {
            cy.log(`Testing with password: ${password}`);
            cy.request({
                method: 'POST',
                url: '/auth/sign-up/supplier',
                failOnStatusCode: false,
                body: {
                    'email': randomEmail,
                    'password': password
                }
            }).then(response => {
                cy.log(JSON.stringify(response));
                expect(response.status).to.equal(422);
                expect(RegisterResponse.compare_models(response.body, false)).to.equal(true);
            });
        });
    });

    it('invalid email', () => {
        const randomPassword = generateRandomPassword();
        cy.log(`Generated password: ${randomPassword}`);
        cy.wrap(invalidEmails).each((email) => {
            cy.log(`Testing with email: ${email}`);
            cy.request({
                method: 'POST',
                url: '/auth/sign-up/supplier',
                failOnStatusCode: false,
                body: {
                    'email': email,
                    'password': randomPassword
                }
            }).then(response => {
                cy.log(JSON.stringify(response));
                expect(response.status).to.equal(422);
                expect(RegisterResponse.compare_models(response.body, false)).to.equal(true);
            });
        });
    });

    it('register with an already existing email', () => {
        const randomEmail = generateRandomEmail();
        cy.log(`Generated email address: ${randomEmail}`);
        const randomPassword = generateRandomPassword();
        cy.log(`Generated password: ${randomPassword}`);

        // Первый запрос для создания пользователя с новым email
        cy.request('POST', '/auth/sign-up/supplier', {
            'email': randomEmail,
            'password': randomPassword
        }).then(response => {
            cy.log(`First registration response:' ${JSON.stringify(response)}`);
            expect(response.status).to.equal(200);
            expect(RegisterResponse.compare_models(response['body'], true)).to.equal(true);
    
            // Добавление задержки перед повторным запросом, чтобы избежать ошибки
            // 'Database error: could not serialize access due to read/write dependencies among transactions'
            cy.wait(2000);

            // Повторная попытка регистрации с тем же email
            const existingEmail = randomEmail;
            cy.log(`Attempting to register again with the same email: ${existingEmail}`);
            const randomPassword = generateRandomPassword();
            cy.log(`Generated password: ${randomPassword}`);
            cy.request({
                method: 'POST',
                url: '/auth/sign-up/supplier',
                failOnStatusCode: false,
                body: {
                    'email': existingEmail,
                    'password': randomPassword
                }
            }).then(second_response => {
                cy.log(`Second registration response:' ${JSON.stringify(second_response)}`);
                expect(second_response.status).to.equal(409); 
                expect(second_response.body).to.have.property('detail', 'Email is already registered');
            });
        });
    });
});

describe('Email Confirmation', () => {
    // GET /auth/sign-up/confirmEmail WORKS: Processing token that was sent to user during the registration process.
    
    it('confirm the email registration successfully', () => {
        // Шаг 1: Создать временный email
        cy.task('createTemporaryEmail').then((emailAddress) => {
            cy.log(`Generated email: ${emailAddress}`);
            
            // Шаг 2: Зарегистрировать пользователя с этим email
            const randomPassword = generateRandomPassword();
            cy.log(`Generated password: ${randomPassword}`);
            cy.request('POST', '/auth/sign-up/supplier', {
                'email': emailAddress,
                'password': randomPassword
            }).then((response) => {
                expect(response.status).to.equal(200);

                // Шаг 3: Ожидать получения email с подтверждением регистрации
                cy.task('waitForEmail', { emailAddress }).then((emailDetails) => {
                    // Шаг 4: Извлечь ссылку на подтверждение из email
                    cy.task('parseRegistrationLink', emailDetails).then((confirmationLink) => {
                        cy.log(`Confirmation link: ${confirmationLink}`);

                        // Шаг 5: Извлечь токен из ссылки
                        const url = new URL(confirmationLink);
                        const token = url.searchParams.get('token');
                        cy.log(`Extracted token: ${token}`);

                        // Шаг 6: Отправить GET запрос на подтверждение email с токеном
                        cy.request({
                            method: 'GET',
                            url: '/auth/sign-up/confirmEmail',
                            qs: { token }, // Передаем токен в параметре query 
                            // Параметр qs в cy.request() используется для указания query string (строки запроса),
                            // то есть параметров, которые добавляются в URL после знака вопроса ?. qs принимает объект, 
                            //где ключи — это названия параметров, а значения — это значения параметров. qs: { token: 'vefrfrf' // передача параметра token }
                            // failOnStatusCode: false 
                        }).then((confirmationResponse) => {
                            cy.log(JSON.stringify(confirmationResponse));
                            expect(confirmationResponse.status).to.equal(200);
                            expect(СonfirmationResponse.compare_models(confirmationResponse['body'], true)).to.equal(true);
                        });
                    });
                });
            });
        });
    });

    it('negative confirm registration without token', () => {
        cy.request({
            method: 'GET',
            url: '/auth/sign-up/confirmEmail',
            qs: '', // missing token
            failOnStatusCode: false 
        }).then((confirmationResponse) => {
            cy.log(JSON.stringify(confirmationResponse));
            expect(confirmationResponse.status).to.equal(422);
            expect(СonfirmationResponse.compare_models(confirmationResponse['body'], false)).to.equal(true);
            // expect(confirmationResponse.body).to.have.property('detail', 'Invalid token');
        });
    })

    it('negative confirm registration with invalid token', () => {
        cy.request({
            method: 'GET',
            url: '/auth/sign-up/confirmEmail',
            qs: {
                token: 'qwerty' // invalid token
            },
            failOnStatusCode: false 
        }).then((confirmationResponse) => {
            cy.log(JSON.stringify(confirmationResponse));
            expect(confirmationResponse.status).to.equal(403);
            expect(confirmationResponse.body).to.have.property('detail', 'Invalid token');
        });
    })
});
