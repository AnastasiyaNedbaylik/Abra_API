import { generateRandomEmail, generateRandomPassword } from '../utils/data';
import RegisterResponse from '../models/api_models_abra';

describe('register suplier', () => {
    it('positive', () => {
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

    it('wrong password', () => {
        const randomEmail = generateRandomEmail();
        cy.log('Generated email address:', randomEmail);
        cy.request({
            method: 'POST',
            url: '/auth/sign-up/supplier', 
            failOnStatusCode: false,
            body: {
                'email': randomEmail,
                'password': 'qwerty'
        }
    }).then(response => {
        cy.log(JSON.stringify(response)); // Вывод полного объекта response в логи
        expect(response['status']).to.equal(422);
        // for (let key of Object.keys(body)) cy.log(key, body[key]);
        expect(RegisterResponse.compare_models(response['body'], false)).to.equal(true);
        })
    })
})