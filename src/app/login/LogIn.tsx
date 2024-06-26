'use client';

import { Divider } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { LocalLogin } from './LocalLogin';
import { InputForm } from '@src/containers/InputForm';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/navigation';
import { useStore } from '@src/store/useStore';

const LogIn: React.FC = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/videos');
    }
  }, [isAuthenticated, router]);

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