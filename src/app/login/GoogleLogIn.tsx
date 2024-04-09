import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Alert, Box } from '@mui/material';
import { INPUT_FORM_WIDTH } from '@src/utils/constants';
import { usePathname } from 'next/navigation';

// eslint-disable-next-line
declare const google: any;

const GoogleLogIn: React.FC = () => {
  const googleLoginErrorMessage = 'TODO: Add google error message!'; // TODO
  const googleSso = useRef(null);
  const { origin } = usePathname();

  useEffect(() => {
    if (googleSso.current) {
      google.accounts.id.initialize({
        client_id: process.env.GOOGLE_AUTH_CLIENT_ID!,
        login_uri: `${process.env.SERVER_BASE_URL!}/auth/login/google?state=${origin}`,
        ux_mode: 'redirect',
      });
      google.accounts.id.renderButton(googleSso.current, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'center',
        width: INPUT_FORM_WIDTH,
      });
    }
    // eslint-disable-next-line
  }, [googleSso.current]);


  return (
    <Box sx={{ mb: 2 }}>
      <div ref={googleSso}/>
      <Alert
        severity="error"
        sx={{
          display: googleLoginErrorMessage !== '' ? 'flex' : 'none',
          alignItems: 'center',
          mt: 1
        }}>
        {googleLoginErrorMessage}
      </Alert>
    </Box>
  );
};

export { GoogleLogIn };