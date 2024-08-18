import LoginResponse from '../models/api_models_abra';
import RegisterResponse from '../models/api_models_abra';
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
        registerAndLoginUser().then(() => {
            // Выполняем действия после успешной регистрации и входа
            // Нет необходимости в cy.reload() для API тестов
        });
    });

    it('set up account', () => {
        // Генерация случайных данных для запроса
        const firstName = generateRandomFirstName();
        const lastName = generateRandomLastName();
        const phoneNumber = generateRandomPhoneNumber();

        // Логирование сгенерированных данных
        cy.log('Generated first name:', firstName);
        cy.log('Generated last name:', lastName);
        cy.log('Generated phone number:', phoneNumber);

        // Отправка запроса с использованием сгенерированных данных
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
            // Проверка успешного ответа
            expect(response.status).to.equal(200);
        });
    });
});