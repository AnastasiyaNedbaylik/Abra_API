const { faker } = require('@faker-js/faker'); // нужно обновить до более новой версии

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
    'H1e!+'
  ];

  /**
 * Генерирует случайное имя.
 * @returns {string} - Случайное имя.
 */
export function generateRandomFirstName() {
  return faker.name.firstName();
};

/**
* Генерирует случайную фамилию.
* @returns {string} - Случайная фамилия.
*/
export function generateRandomLastName() {
  return faker.name.lastName();
};

/**
 * Генерирует случайный номер телефона без префикса.
 * @returns {string} - Случайный номер телефона без префикса.
 */
export function generateRandomPhoneNumber() {
  // Генерируем случайный номер телефона без префикса
  return faker.phone.number('9#########');
};

/**
 * Генерирует случайное число из 9 цифр.
 * @returns {string} - Случайное 9-значное число в виде строки.
 */
export function generateRandomNineDigitNumber() {
  const min = 100000000;
  const max = 999999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
};

/**
 * Генерирует случайный год в диапазоне от 1970 до текущего года.
 * @returns {number} - Случайный год в диапазоне от 1970 до текущего года.
 */
export function generateRandomYear() {
  const currentYear = new Date().getFullYear();
  const startYear = 1970;
  return Math.floor(Math.random() * (currentYear - startYear + 1)) + startYear;
};

/**
 * Генерирует случайный текст для поля "About the business".
 * @returns {string} - Случайный текст для описания бизнеса.
 */
export function generateRandomAboutBusinessText() {
  const descriptors = [
      'Innovative',
      'Leading',
      'Creative',
      'Sustainable',
      'Cutting-edge',
      'Dynamic',
      'Customer-focused',
      'High-quality'
  ];

  const industries = [
      'technology solutions',
      'retail services',
      'consulting',
      'manufacturing',
      'digital marketing',
      'e-commerce',
      'financial services',
      'healthcare'
  ];

  const missionStatements = [
      'We strive to deliver exceptional value to our customers.',
      'Our mission is to provide innovative solutions that enhance your business.',
      'Committed to excellence and customer satisfaction.',
      'We focus on creating high-quality products and services.',
      'Our goal is to lead the industry through innovation and sustainability.'
  ];

  // Randomly select a descriptor, industry, and mission statement
  const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
  const industry = industries[Math.floor(Math.random() * industries.length)];
  const missionStatement = missionStatements[Math.floor(Math.random() * missionStatements.length)];

  // Generate the random text
  return `${descriptor} company specializing in ${industry}. ${missionStatement}`;
};

/**
 * Генерирует случайный адрес.
 * @returns {string} - Случайный адрес.
 */
export function generateRandomAddress() {
  const streets = [
      'Main St', 'Elm St', 'Maple Ave', 'Oak Dr', 'Pine Ln', 'Cedar Blvd',
      'Sunset Blvd', 'Broadway', 'Park Ave', 'Fifth Ave'
  ];

  const cities = [
      'Springfield', 'Riverside', 'Greenville', 'Madison', 'Franklin', 'Clinton',
      'Jackson', 'Centerville', 'Brooklyn', 'Shelbyville'
  ];

  const states = [
      'CA', 'TX', 'NY', 'FL', 'IL', 'PA', 'OH', 'MI', 'GA', 'NC'
  ];

  const zipCodes = [
      '90001', '10001', '33101', '60601', '75201', '19101', '48201', '30301', '98101', '27501'
  ];

  // Генерация случайных значений
  const streetNumber = Math.floor(Math.random() * 9999) + 1; // Генерирует номер дома от 1 до 9999
  const streetName = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const zipCode = zipCodes[Math.floor(Math.random() * zipCodes.length)];

  // Формирование случайного адреса
  return `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}`;
};

export const long_value = 'Lorem ipsum dolor sit amet, c labore et dolore vhjg'; // max+1 = 51 symbol