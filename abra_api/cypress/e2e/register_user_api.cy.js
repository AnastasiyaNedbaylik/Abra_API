import { generateRandomEmail, generateRandomPassword } from '../utils/data';
import RegisterResponse from '../models/api_models_abra';
import { invalidEmails, invalidPasswords } from '../utils/data';

describe('register suplier', () => {
    it('positive (valid email and password)', () => {
        const randomEmail = generateRandomEmail();
        cy.log('Generated email address:', randomEmail);
        const randomPassword = generateRandomPassword();
        cy.log('Generated password:', randomPassword);
        cy.request('POST', '/auth/sign-up/supplier' , {
            'email': randomEmail,
            'password': randomPassword
        }).then(response => {
            cy.log(JSON.stringify(response));
            expect(response['status']).to.equal(200);
            expect(RegisterResponse.compare_models(response['body'], true)).to.equal(true);
        });
    })

    it('invalid password', () => {
        const randomEmail = generateRandomEmail();
        cy.log('Generated email address:', randomEmail);
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
        cy.log('Generated password:', randomPassword);
        cy.wrap(invalidEmails).each((email) => {
            cy.log(`Testing with password: ${email}`);
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
});