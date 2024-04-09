import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { INPUT_FORM_WIDTH } from '@src/utils/constants';

type InputFormProps = {
  pageTitle: string;
  icon: React.ReactElement;
  children: React.ReactNode;
}

const InputForm: React.FC<InputFormProps> = ({ pageTitle, icon, children }) => {
  return (
    <Container maxWidth="xs">
      <Stack sx={{ alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {icon}
        </Avatar>
        <Typography component="h1" variant="h5">
          {pageTitle}
        </Typography>
        <Stack sx={{ maxWidth: INPUT_FORM_WIDTH, mt: 3 }}>
          {children}
        </Stack>
      </Stack>
    </Container>
  );
};

export { InputForm };
