import { generateRandomPassword } from '../utils/data';
import СonfirmationResponse from '../models/api_models_abra';

export function confirmEmailRegistration(emailAddress) {
    const randomPassword = generateRandomPassword();
    cy.log(`Сгенерированный пароль: ${randomPassword}`);

    // Шаг 1: Зарегистрировать пользователя
    return cy.request('POST', '/auth/sign-up/supplier', {
        'email': emailAddress,
        'password': randomPassword
    }).then((response) => {
        expect(response.status).to.equal(200);

        // Шаг 2: Ожидать получения email с подтверждением регистрации
        return cy.task('waitForEmail', { emailAddress }).then((emailDetails) => {
            // Шаг 3: Извлечь ссылку на подтверждение из email
            return cy.task('parseRegistrationLink', emailDetails).then((confirmationLink) => {
                cy.log(`Ссылка для подтверждения: ${confirmationLink}`);

                // Шаг 4: Извлечь токен из ссылки
                const url = new URL(confirmationLink);
                const token = url.searchParams.get('token');
                cy.log(`Извлеченный токен: ${token}`);

                // Шаг 5: Отправить GET запрос на подтверждение email с токеном
                return cy.request({
                    method: 'GET',
                    url: '/auth/sign-up/confirmEmail',
                    qs: { token }
                }).then((confirmationResponse) => {
                    cy.log(JSON.stringify(confirmationResponse));
                    expect(confirmationResponse.status).to.equal(200);
                    expect(СonfirmationResponse.compare_models(confirmationResponse['body'], true)).to.equal(true);
                    
                    // Возвращаем пароль для последующего использования
                    return cy.wrap(randomPassword); // Возвращаем пароль как Cypress объект
                });
            });
        });
    });
}
