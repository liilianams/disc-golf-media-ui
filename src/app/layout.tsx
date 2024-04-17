import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import * as React from 'react';
import { ReactNode } from 'react';
import { NavDrawer } from '@src/components/NavDrawer/NavDrawer';
import TopBar from '@src/components/TopBar';
import Main from '@src/containers/Main';
import { DrawerProvider } from '@src/contexts/DrawerContext';
import ThemeRegistry from '@src/components/ThemeRegistry';
import { FavoritesProvider } from '@src/contexts/FavoritesContext';
import { getChannels } from '@src/utils/channel-helpers';
import { AuthProvider } from '@src/contexts/AuthContext';

export const metadata: Metadata = {
  title: "Disc Golf Media",
  description: "Disc Golf Media",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const initialChannels = await getChannels();
  return (
    <html lang="en">
    <head>
      <title>Disc Golf Media</title>
      <script src="https://accounts.google.com/gsi/client" async/>
    </head>
    <body>
      <AuthProvider>
        <FavoritesProvider initialChannels={initialChannels}>
            <ThemeRegistry>
              <Box sx={{ display: 'flex' }}>
                <DrawerProvider>
                  <TopBar/>
                  <NavDrawer/>
                </DrawerProvider>
                <Main>
                  {children}
                </Main>
              </Box>
            </ThemeRegistry>
        </FavoritesProvider>
      </AuthProvider>
    </body>
    </html>
  );
};

export default RootLayout;

