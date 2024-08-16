/**
 * Случайный адрес электронной почты.
 * @returns {string} Случайный адрес электронной почты.
 */
export function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${randomString}@example.com`;
  };

    /**
 * Случайный пароль, соответствующий заданным требованиям.
 * @returns {string} Случайный пароль.
 */
export function generateRandomPassword() {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!#*+$'; //Remove symbol '/'s
  
    const allChars = lowerCase + upperCase + numbers + specialChars;
  
    let password = '';
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
    for (let i = password.length; i < 8; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
  
    return password.split('').sort(() => 0.5 - Math.random()).join(''); // Перемешиваем символы для случайного порядка
  };