import { format, isEqual, parseISO } from 'date-fns';

const convertDateToDateTime = (date: string) => {
  const dateArray = date.split('-');
  const day = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]) - 1; // Months are 0-based
  const year = parseInt(dateArray[2]);
  return new Date(year, month, day);
};

/**
 * Formats a given date and time string into the specified output format.
 *
 * @param {string} dateTime - The date and time string in the format of yyyy-MM-ddTHH:mm:ss.
 * @param {string} outputFormat - The desired format for the output date and time.
 * @returns {string} The formatted date (and time) string.
 */
const formatDateTime = (dateTime: string, outputFormat: string) => {
  return format(parseISO(dateTime), outputFormat);
};

/**
 * Formats a given date string into the specified output format.
 *
 * @param {string} date - The date string in the format of dd-MM-yyyy.
 * @param {string} outputFormat - The desired format for the output date.
 * @returns {string} The formatted date string.
 */
const formatDate = (date: string, outputFormat: string) => {
  return format(convertDateToDateTime(date), outputFormat);
};

/**
 * Compares two dates for equality (time comparison is excluded).
 *
 * @param {Date} dateTime1 - Date object representing the date and time.
 * @param {string} dateString2 - Date string in the format of dd-MM-yyyy.
 * @returns {boolean} True if the dates are equal, false otherwise.
 */
const areDatesEqual = (dateTime1: Date, dateString2: string) => {
  const dateString1 = format(dateTime1, 'dd-MM-yyyy');
  const date1 = new Date(convertDateToDateTime(dateString1));
  const date2 = new Date(convertDateToDateTime(dateString2));
  return isEqual(date1, date2);
};

/**
 * Validates an email address against a regular expression pattern.
 * The email must meet the following criteria:
 * - Begins with one or more characters that can be a combination of any lowercase or uppercase letters (a-z, A-Z), digits (0-9), underscores (_), dots (.), or hyphens (-).
 * - Followed by an at symbol (@).
 * - Followed by one or more characters that can include any lowercase or uppercase letters or dots, with dots not being consecutive or starting the domain part.
 * - Ends with a dot (.) followed by a domain suffix that can be 2 to 6 letters long, allowing for standard domain suffixes.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address is valid according to the defined regex pattern, false otherwise.
 */
const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

/**
 * Validates a password against a regular expression pattern.
 * The password must meet the following criteria:
 * - At least one lowercase letter (a-z).
 * - At least one uppercase letter (A-Z).
 * - At least one digit (0-9).
 * - At least one special character from the set [e.g. @$!%*?&...].
 * - Length of between 8 to 16 characters.
 *
 * @param {string} password - The password string to validate.
 * @returns {boolean} True if the password is valid according to the defined regex pattern, false otherwise.
 */
const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
  return passwordRegex.test(password);
};

/**
 * Converts a display string into an ID string.
 * Removes whitespace and converts the string to lowercase.
 *
 * @param {string} displayString - The display string to convert.
 * @returns {string} The ID string in lowercase without spaces.
 *
 * @example
 * // returns 'logout'
 * convertDisplayStringToActionString('Log out');
 */
const convertDisplayStringToIdString = (displayString: string): string => {
  return displayString.replace(/\s+/g, '').toLowerCase();
};

export { areDatesEqual, formatDate, formatDateTime, validateEmail, validatePassword, convertDisplayStringToIdString };