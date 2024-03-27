import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    formBackground?: string;
    footer?: string;
    footerTerms?: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    footerTitle: true;
    footerLink: true;
    footerTerms: true;
    sidebarCopy: true;
  }
}

const inter = Inter({ subsets: ["latin"] });

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003EDD',
    },
    success: {
      main: '#21792D',
    },
    text: {
      primary: '#222',
      disabled: '#707070',
    },
    divider: '#CCC',
    footer: '#E8E8E8',
    footerTerms: '#CCC',
    formBackground: '#FAFAFA',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '5px 11px',
          '& svg': {
            marginRight: '.5rem',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          footerTerms: 'p',
          sidebarCopy: 'p',
        },
      },
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            marginBottom: '1.5rem',
          },
        },
        {
          props: { variant: 'h6' },
          style: {
            ...inter.style,
            lineHeight: '28px',
          },
        },
        {
          props: { variant: 'body1' },
          style: {
            ...inter.style,
          },
        },
        {
          props: { variant: 'body2' },
          style: {
            lineHeight: '22px',
          },
        },
        {
          props: { variant: 'footerTitle' },
          style: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
          },
        },
        {
          props: { variant: 'footerLink' },
          style: {
            fontSize: '.875rem',
            fontWeight: 'normal',
          },
        },
        {
          props: { variant: 'footerTerms' },
          style: {
            fontSize: '.75rem',
            fontWeight: 'normal',
            lineHeight: '1.125rem',
            margin: '1.25rem 0',
          },
        },
        {
          props: {
            variant: 'sidebarCopy',
          },
          style: {
            fontWeight: 350,
            fontSize: '1.5rem',
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontWeight: 400,
      fontSize: '2.5rem',
    },
  },
});


theme = createTheme(theme, {
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          '&.Mui-selected': {
            color: theme.palette.text.primary,
          },
          '& svg *': {
            fill: theme.palette.text.primary,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '& .MuiButtonBase-root': {
            minHeight: 0,
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
          height: 'auto',
        },
        content: {
          margin: 0,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
          margin: 0,
        },
      },
    },
  },
});

export default theme;
