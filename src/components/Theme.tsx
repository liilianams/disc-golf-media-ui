'use client';

import * as React from 'react';
import { createTheme, Theme } from '@mui/material/styles';

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    secondaryFontSize: string;
  }

  interface TypographyOptions {
    secondaryFontSize: string;
  }
}

// const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'> & { href: LinkProps['to'] }>((props, ref) => {
//   const { href, ...other } = props;
//   return <Link ref={ref} to={href} {...other} role={undefined}/>;
// });

const DefaultTheme: Theme = createTheme({
  palette: {
    grey: {
      500: '#A5A5A5',
    }
  },
  typography: {
    secondaryFontSize: '0.75rem',
  },
  components: {
    // MuiButtonBase: {
    //   defaultProps: { LinkComponent: LinkBehavior },
    // },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 1201,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          zIndex: 1200,
        },
      },
    },
  },
});

export default DefaultTheme;