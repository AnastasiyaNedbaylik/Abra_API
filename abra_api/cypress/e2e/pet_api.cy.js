import { generateRandomEmail, generateRandomPassword } from '../utils/data';
import RegisterResponse from '../models/api_models';

describe('register', () => {
    it('positive', () => {
        const randomEmail = generateRandomEmail();
        cy.log('Generated email address:', randomEmail);
        cy.request('POST', '/register' , {
            'email': randomEmail,
            'password': '1234456',
            'confirm_password': '1234456'
        }).then(({ body }) => {
            cy.log(JSON.stringify(body)) 
            expect(RegisterResponse.compare_models(body)).to.equal(true);
            // Проверка наличия email в теле ответа
            expect(body).to.have.property('email', randomEmail);
        })
    })

    it('wrong password', () => {
        const randomEmail = generateRandomEmail();
        cy.request({
            method: 'POST',
            url: '/register', 
            failOnStatusCode: false,
            body: {
                'email': randomEmail,
                'password': '1234456',
                'confirm_password': '4321'
        }
    }).then(response => {
        cy.log(JSON.stringify(response)) // Вывод полного объекта response в логи
        expect(response['status']).to.equal(400);
        // for (let key of Object.keys(body)) cy.log(key, body[key]);
        expect(RegisterResponse.compare_models(response['body'], false)).to.equal(true);
        })
        cy.log('Generated email address:', randomEmail);
    })
})