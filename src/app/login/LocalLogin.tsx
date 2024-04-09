'use client';

import { Alert, Box, Button, Link } from '@mui/material';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ENV, INVALID_EMAIL_ERROR, INVALID_PASSWORD_ERROR } from '@src/utils/constants';
import { validateEmail, validatePassword } from '@src/utils/helpers';
import { InputFormTextField } from '@src/components/InputFormTextField';

const delay = 1000;

const LocalLogin: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validationErrors, setValidationErrors] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = React.useState('');

  const validateFields = useCallback(() => {
    const errors = {
      email: '',
      password: ''
    };

    if (email && !validateEmail(email)) {
      errors.email = INVALID_EMAIL_ERROR;
      setErrorMessage('');
      // setGoogleLoginErrorMessage(''); TODO use auth
    }

    if (password && !validatePassword(password)) {
      errors.password = INVALID_PASSWORD_ERROR;
      setErrorMessage('');
      // setGoogleLoginErrorMessage(''); TODO use auth
    }

    setValidationErrors(errors);
  }, [email, password, setErrorMessage]);

  useEffect(() => {
    const timeout = setTimeout(validateFields, delay);
    return () => clearTimeout(timeout);
  }, [email, password, validateFields]);

  const canSubmit = () => {
    return validateEmail(email) && validatePassword(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (canSubmit()) {
      const response = { status: 302, data: data }; // await loginUser(data); TODO: use auth
      if (response?.status === 302) {
        if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
          localStorage.setItem('jwt', 'jwt');
        }
        // login(); TODO use auth
      } else {
        // setGoogleLoginErrorMessage(''); TODO use auth
        setErrorMessage(response?.data);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <InputFormTextField
        id="email"
        label="Email Address"
        name="email"
        type="email"
        value={email}
        error={validationErrors.email !== ''}
        helperText={validationErrors.email}
        onChange={(e) => setEmail(e.target.value)}
        onClear={() => setEmail('')}
        autoFocus
        sx={{ mt: 2 }}
      />
      <InputFormTextField
        id="password"
        label="Password"
        name="password"
        type="password"
        value={password}
        error={validationErrors.password !== ''}
        helperText={validationErrors.password}
        onChange={(e) => setPassword(e.target.value)}
        onClear={() => setPassword('')}
        sx={{ my: 1 }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mb: 1 }} disabled={!canSubmit()}>
        Sign In
      </Button>
      <Alert severity="error" sx={{ display: errorMessage !== '' ? 'flex' : 'none', alignItems: 'center', mb: 1 }}>
        {errorMessage}
      </Alert>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Link href={'/forgot-password'} variant="body2">
          Forgot password?
        </Link>
        <Link href={'/signup'} variant="body2">
          Sign Up
        </Link>
      </Box>
    </Box>
  );
};

export { LocalLogin };