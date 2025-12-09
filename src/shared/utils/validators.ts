import { VALIDATION } from './constants';

export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email.trim());
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION.MIN_PASSWORD_LENGTH;
};

export const validateCNPJ = (cnpj: string): boolean => {
  const cleaned = cnpj.replace(/\D/g, '');

  if (cleaned.length !== VALIDATION.CNPJ_LENGTH) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(cleaned)) {
    return false;
  }

  let length = cleaned.length - 2;
  let numbers = cleaned.substring(0, length);
  const digits = cleaned.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cleaned.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

export const validateCEP = (cep: string): boolean => {
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.length === VALIDATION.CEP_LENGTH;
};

export const validateLatitude = (lat: number): boolean => lat >= -90 && lat <= 90;

export const validateLongitude = (lng: number): boolean => lng >= -180 && lng <= 180;

export const validatePrice = (price: number): boolean => price > 0;

export const validateRequired = (value: string): boolean => value.trim().length > 0;

export const validateMaxLength = (value: string, max: number): boolean => value.length <= max;

export const validateImageUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return url.startsWith('file://') || url.startsWith('asset://');
  }
};
