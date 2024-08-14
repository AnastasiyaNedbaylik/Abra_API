/**
 * Случайный адрес электронной почты.
 * @returns {string} Случайный адрес электронной почты.
 */
export function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${randomString}@example.com`;
  };