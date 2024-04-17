'use client';

import { Divider } from '@mui/material';
import * as React from 'react';
import { LocalLogin } from './LocalLogin';
import { InputForm } from '@src/containers/InputForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '@src/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const LogIn: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/videos');
  }

  return (
    !isAuthenticated && (
      <InputForm pageTitle={'Log In'} icon={<LockOutlinedIcon/>}>
        {/*<GoogleLogIn/>*/}
        <Divider sx={{ color: 'grey.500' }}>or</Divider>
        <LocalLogin/>
      </InputForm>
    )
  );
};

export default LogIn;