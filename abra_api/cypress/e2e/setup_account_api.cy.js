import LoginResponse from '../models/api_models_abra';
import SetUpAccountResponse from '../models/api_models_abra';
import { generateRandomFirstName, 
    generateRandomLastName, 
    generateRandomPhoneNumber, 
    generateRandomNineDigitNumber, 
    generateRandomYear, generateRandomAboutBusinessText, 
    generateRandomEmail, generateRandomAddress, long_value } from '../utils/data';
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
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(200);
            expect(SetUpAccountResponse.compare_models(response['body'], true)).to.equal(true);

        });
    });

    it('set up account negative (max+1 value for first name)', () => {
        const lastName = generateRandomLastName();
        cy.log(`Generated last name: ${lastName}`);
        const phoneNumber = generateRandomPhoneNumber();
        cy.log(`Generated phone number: ${phoneNumber}`);

        cy.request({
            method: 'POST',
            url: '/auth/sign-up/account/sendInfo',
            failOnStatusCode: false,
            body: {
                first_name: long_value,
                last_name: lastName,
                country_id: 2,
                phone_number: phoneNumber
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(409);
        });
    });

    it('set up account negative (empty first name)', () => {
        const lastName = generateRandomLastName();
        cy.log(`Generated last name: ${lastName}`);
        const phoneNumber = generateRandomPhoneNumber();
        cy.log(`Generated phone number: ${phoneNumber}`);

        cy.request({
            method: 'POST',
            url: '/auth/sign-up/account/sendInfo',
            failOnStatusCode: false,
            body: {
                first_name: '',
                last_name: lastName,
                country_id: 2,
                phone_number: phoneNumber
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(422);
            expect(SetUpAccountResponse.compare_models(response['body'], false)).to.equal(true);

        });
    });

    it('set up account negative (empty last name)', () => {
        const firstName = generateRandomFirstName();
        cy.log(`Generated first name: ${firstName}`);
        const phoneNumber = generateRandomPhoneNumber();
        cy.log(`Generated phone number: ${phoneNumber}`);

        cy.request({
            method: 'POST',
            url: '/auth/sign-up/account/sendInfo',
            failOnStatusCode: false,
            body: {
                first_name: firstName,
                last_name: '',
                country_id: 2,
                phone_number: phoneNumber
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(422);
            expect(SetUpAccountResponse.compare_models(response['body'], false)).to.equal(true);
        });
    });

    it('set up account negative (empty country id)', () => {
        const firstName = generateRandomFirstName();
        cy.log(`Generated first name: ${firstName}`);
        const lastName = generateRandomLastName();
        cy.log(`Generated last name: ${lastName}`);
        const phoneNumber = generateRandomPhoneNumber();
        cy.log(`Generated phone number: ${phoneNumber}`);

        cy.request({
            method: 'POST',
            url: '/auth/sign-up/account/sendInfo',
            failOnStatusCode: false,
            body: {
                first_name: firstName,
                last_name: lastName,
                country_id: '',
                phone_number: phoneNumber
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(422);
            expect(SetUpAccountResponse.compare_models(response['body'], false)).to.equal(true);
        });
    });

    it('set up account negative (incorrect country id)', () => {
        const firstName = generateRandomFirstName();
        cy.log(`Generated first name: ${firstName}`);
        const lastName = generateRandomLastName();
        cy.log(`Generated last name: ${lastName}`);
        const phoneNumber = generateRandomPhoneNumber();
        cy.log(`Generated phone number: ${phoneNumber}`);

        cy.request({
            method: 'POST',
            url: '/auth/sign-up/account/sendInfo',
            failOnStatusCode: false,
            body: {
                first_name: firstName,
                last_name: lastName,
                country_id: 'test',
                phone_number: phoneNumber
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(422);
            expect(SetUpAccountResponse.compare_models(response['body'], false)).to.equal(true);
        });
    });

    it('set up account negative (empty phone)', () => {
        const firstName = generateRandomFirstName();
        cy.log(`Generated first name: ${firstName}`);
        const lastName = generateRandomLastName();
        cy.log(`Generated last name: ${lastName}`);

        cy.request({
            method: 'POST',
            url: '/auth/sign-up/account/sendInfo',
            failOnStatusCode: false,
            body: {
                first_name: firstName,
                last_name: lastName,
                country_id: 2,
                phone_number: ''
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(422);
            expect(SetUpAccountResponse.compare_models(response['body'], false)).to.equal(true);
        });
    });

    it('set up account negative (incorrect phone)', () => {
        const firstName = generateRandomFirstName();
        cy.log(`Generated first name: ${firstName}`);
        const lastName = generateRandomLastName();
        cy.log(`Generated last name: ${lastName}`);

        cy.request({
            method: 'POST',
            url: '/auth/sign-up/account/sendInfo',
            failOnStatusCode: false,
            body: {
                first_name: firstName,
                last_name: lastName,
                country_id: 2,
                phone_number: 'test'
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(422);
            expect(SetUpAccountResponse.compare_models(response['body'], false)).to.equal(true);
        });
    });

});