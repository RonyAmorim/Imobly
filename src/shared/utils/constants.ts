export const STORAGE_KEYS = {
  USER: '@imobly:user',
  PROPERTIES: '@imobly:properties',
  AUTH_TOKEN: '@imobly:auth_token',
} as const;

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 1000,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CNPJ_LENGTH: 14,
  CEP_LENGTH: 8,
} as const;

export const LAYOUT = {
  CONTAINER_PADDING: 16,
  CARD_SPACING: 16,
  FORM_SPACING: 24,
  HEADER_HEIGHT: 56,
  FAB_SIZE: 56,
} as const;

export const IMAGE = {
  PLACEHOLDER: 'https://via.placeholder.com/400x300/2C3E50/FFFFFF?text=Imobly',
  MAX_SIZE_MB: 5,
  ALLOWED_FORMATS: ['jpg', 'jpeg', 'png', 'webp'],
} as const;

export const BRAZILIAN_STATES = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const;
