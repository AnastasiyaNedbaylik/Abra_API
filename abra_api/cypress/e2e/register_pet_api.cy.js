import { generateRandomEmail, generateRandomPassword } from '../utils/data';


describe('register', () => {
    it('positive', () => {
        const randomEmail = generateRandomEmail();
        cy.request('POST', '/register' , {
            'email': randomEmail,
            'password': '1234456',
            'confirm_password': '1234456'
        }).then(({body}) => {
            for (let key of Object.keys(body)) cy.log(key, body[key])
        })
        cy.log('Generated email address:', randomEmail);
    })
})