import { createTheme, Theme } from '@mui/material/styles';
import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    secondaryFontSize: string;
  }

  interface TypographyOptions {
    secondaryFontSize: string;
  }
}

const LinkBehaviour = forwardRef<HTMLAnchorElement, LinkProps>(function LinkBehaviour(props, ref) {
  return (
    <Link ref={ref} {...props} />
  );
});

// eslint-disable-next-line
const theme: Theme = createTheme({
  palette: {
    grey: {
      500: '#A5A5A5',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    secondaryFontSize: '0.75rem',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour
      }
    },
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

export default theme;
