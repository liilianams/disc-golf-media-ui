'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, Grid, Link } from '@mui/material';
import { InputForm } from '@src/containers/InputForm';
import {
  EMAIL_MISMATCH_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  PASSWORD_MISMATCH_ERROR
} from '@src/utils/constants';
import { validateEmail, validatePassword } from '@src/utils/helpers';
import { PersonAdd } from '@mui/icons-material';
import Check from '@mui/icons-material/Check';
import { useRouter } from 'next/navigation';
import Loading from '@src/components/Loading';
import { InputFormTextField } from '@src/components/InputFormTextField';

const delay = 1500;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [displaySuccess, setDisplaySuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const isAuthenticated = false; // TODO: replace with auth
  const isLoadingAuth = false; // TODO: replace with auth
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateFields = useCallback(() => {
    setErrors({
      email: email !== '' ? (validateEmail(email) ? '' : INVALID_EMAIL_ERROR) : '',
      confirmEmail: confirmEmail !== '' ? (email === confirmEmail ? '' : EMAIL_MISMATCH_ERROR) : '',
      password: password !== '' ? (validatePassword(password) ? '' : INVALID_PASSWORD_ERROR) : '',
      confirmPassword: confirmPassword !== '' ? (password === confirmPassword ? '' : PASSWORD_MISMATCH_ERROR) : '',
    });
  }, [email, confirmEmail, password, confirmPassword]);

  useEffect(() => {
    const timeout = setTimeout(validateFields, delay);
    return () => clearTimeout(timeout);
  }, [email, confirmEmail, password, confirmPassword, validateFields]);

  const canSubmit = () => {
    return (
      validateEmail(email) &&
      email === confirmEmail &&
      validatePassword(password) &&
      password === confirmPassword
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (canSubmit()) {
      const response = { status: 200, data: data }; //await signUpUser(data);
      if (response) {
        response.status === 200 ? setDisplaySuccess(true) : setErrorMessage(response.data);
      }
    }
  };

  if (isAuthenticated || isLoadingAuth) {
    return <Loading/>;
  }

  return (
    <InputForm pageTitle="Sign Up" icon={<PersonAdd/>}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <InputFormTextField
          id="email"
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onClear={() => setEmail('')}
          error={errors.email !== ''}
          helperText={errors.email}
          autoFocus
          sx={{ mb: 1 }}
          disabled={(displaySuccess || errorMessage !== '')}
        />
        <InputFormTextField
          id="confirm-email"
          label="Confirm Email Address"
          name="confirm-email"
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          onClear={() => setConfirmEmail('')}
          error={errors.confirmEmail !== ''}
          helperText={errors.confirmEmail}
          sx={{ mb: 2 }}
          disabled={(displaySuccess || errorMessage !== '') || !validateEmail(email)}
        />
        <InputFormTextField
          id="password"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClear={() => setPassword('')}
          error={errors.password !== ''}
          helperText={errors.password}
          sx={{ mb: 1 }}
          disabled={(displaySuccess || errorMessage !== '') || (!validateEmail(confirmEmail) || email !== confirmEmail)}
        />
        <InputFormTextField
          id="confirm-password"
          label="Confirm Password"
          name="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onClear={() => setConfirmPassword('')}
          error={errors.confirmPassword !== ''}
          helperText={errors.confirmPassword}
          sx={{ mb: 2 }}
          disabled={(displaySuccess || errorMessage !== '') || !validatePassword(password)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mb: 1, display: (displaySuccess || errorMessage !== '') ? 'none' : 'inline-flex' }}
          disabled={!validatePassword(password) || password !== confirmPassword}
        >
          Sign Up
        </Button>
        <Alert
          icon={<Check fontSize="inherit"/>}
          severity="success"
          sx={{ display: displaySuccess ? 'flex' : 'none', alignItems: 'center' }}
        >
          Sign up successful.<br/>Click <Link href="/login" color="success.dark"><strong>here</strong></Link> to log
          in.
        </Alert>
        <Alert severity="error" sx={{ display: errorMessage !== '' ? 'flex' : 'none', alignItems: 'center' }}>
          {errorMessage}<br/>Click here <Link href="/signup" color="error.dark"><strong>here</strong></Link> to try
          again.
        </Alert>
        <Grid container justifyContent="center">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </InputForm>
  );
};

export { SignUp };
