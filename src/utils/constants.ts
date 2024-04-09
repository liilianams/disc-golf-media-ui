import { Breakpoint } from '@mui/material/styles';

export const DRAWER_WIDTH = 160;

export const INPUT_FORM_WIDTH = '300px';

export const ENV = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

export const SMALL_SCREEN_BREAKPOINT: Breakpoint = 'sm';

export const INVALID_PASSWORD_ERROR = 'Password must be 8-16 characters, ' +
  'contain at least one uppercase letter, ' +
  'one lowercase letter, one number, ' +
  'and one special character (e.g. !@#$%&*...).';

export const INVALID_EMAIL_ERROR = 'Invalid email address';

export const PASSWORD_MISMATCH_ERROR = 'Passwords do not match';

export const EMAIL_MISMATCH_ERROR = 'Emails do not match';