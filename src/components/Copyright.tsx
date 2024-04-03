import { Typography } from '@mui/material';
import * as React from 'react';
import { TypographyProps } from '@mui/material/Typography/Typography';

interface CopyrightProps extends TypographyProps {
  children?: React.ReactNode;
}

const Copyright: React.FC<CopyrightProps> = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © DGM '}
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;