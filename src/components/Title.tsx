import Typography from '@mui/material/Typography';
import * as React from 'react';

type TitleProps = {
  children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = (props) => (
  <Typography component="h2" variant="h6" color="primary" gutterBottom>
    {props.children}
  </Typography>
);

export default Title;