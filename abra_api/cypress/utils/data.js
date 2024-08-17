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
    const specialChars = '!#*+$'; //Удалили символ '/'
  
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

  // Список невалидных emails
  export const invalidEmails = [
    'plainaddress',
    '@missingusername.com',
    'username@.com',
    'username@domain..com',
    'username@domain.com@extra',
    ''
  ];

  // Список невалидных password
  export const invalidPasswords = [
    'onlylowercaseletters',
    'ONLYUPPERCASELETTERS',
    'OnlyLetters',
    '12345678',
    'lettersand123',
    'LETTERS123',
    'LettersAnd123',
    '!#*+$!#*+$',
    'lettersand!#*+$',
    'LETTERS!#*+$',
    'Lettersand!#*+$',
    '12345678!#*+$',
      // Менее 8 символов
    'Pwd1!', 
    'H1e!+',
    ''
  ];