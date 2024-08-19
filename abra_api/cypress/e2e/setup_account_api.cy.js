import LoginResponse from '../models/api_models_abra';
import SetUpAccountResponse from '../models/api_models_abra';
import { generateRandomFirstName, 
    generateRandomLastName, 
    generateRandomPhoneNumber, 
    generateRandomNineDigitNumber, 
    generateRandomYear, generateRandomAboutBusinessText, 
    generateRandomEmail, generateRandomAddress } from '../utils/data';
import { confirmEmailRegistration } from '../utils/registration';
import { registerAndLoginUser } from '../utils/login';

describe('Set up account', () => {
    beforeEach(() => {
        registerAndLoginUser();
    });

    it('set up account', () => {
        const firstName = generateRandomFirstName();
        cy.log(`Generated first name: ${firstName}`);
        const lastName = generateRandomLastName();
        cy.log(`Generated last name: ${lastName}`);
        const phoneNumber = generateRandomPhoneNumber();
        cy.log(`Generated phone number: ${phoneNumber}`);

        cy.request({
            method: 'POST',
            url: '/auth/sign-up/account/sendInfo',
            body: {
                first_name: firstName,
                last_name: lastName,
                country_id: 2,
                phone_number: phoneNumber
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(SetUpAccountResponse.compare_models(response['body'], true)).to.equal(true);

        });
    });
});