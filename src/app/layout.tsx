import type { Metadata } from 'next';
import './globals.css';
import Box from '@mui/material/Box';
import * as React from 'react';
import { ReactNode } from 'react';
import { NavDrawer } from '@src/components/NavDrawer/NavDrawer';
import TopBar from '@src/components/TopBar';
import Main from '@src/components/Main';
import { DrawerProvider } from '@src/contexts/DrawerContext';
import ThemeRegistry from '@src/components/ThemeRegistry';

export const metadata: Metadata = {
  title: "Disc Golf Media",
  description: "Disc Golf Media",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head/>
      <body>
        <DrawerProvider>
          <ThemeRegistry>
            <Box sx={{ display: 'flex' }}>
              <TopBar/>
              <NavDrawer/>
              <Main>
                {children}
              </Main>
            </Box>
          </ThemeRegistry>
        </DrawerProvider>
      </body>
    </html>
  );
};

export default RootLayout;

