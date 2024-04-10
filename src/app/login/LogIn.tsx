'use client';

import { Divider } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { LocalLogin } from './LocalLogin';
import { InputForm } from '@src/containers/InputForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Loading from '@src/components/Loading';
import { useRouter } from 'next/navigation';

const LogIn: React.FC = () => {
  const isAuthenticated = false; // TODO: add auth
  const isLoadingAuth = false; // TODO: add auth
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingAuth && isAuthenticated) {
      router.push('/videos', { replace: true });
    }
  }, [isLoadingAuth, isAuthenticated, router]);

  if (isLoadingAuth || isAuthenticated) {
    return <Loading/>;
  }

  return (
    <InputForm pageTitle={'Log In'} icon={<LockOutlinedIcon/>}>
      {/*<GoogleLogIn/>*/}
      <Divider sx={{ color: 'grey.500' }}>or</Divider>
      <LocalLogin/>
    </InputForm>
  );
};

export default LogIn;