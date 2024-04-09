import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import * as React from 'react';
import { ReactNode } from 'react';
import { NavDrawer } from '@src/components/NavDrawer/NavDrawer';
import TopBar from '@src/components/TopBar';
import Main from '@src/components/Main';
import { DrawerProvider } from '@src/contexts/DrawerContext';
import ThemeRegistry from '@src/components/ThemeRegistry';
import { FavoritesProvider } from '@src/contexts/FavoritesContext';
import { getChannels } from '@src/entities/channel-helpers';

export const metadata: Metadata = {
  title: "Disc Golf Media",
  description: "Disc Golf Media",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const initialChannels = await getChannels();
  return (
    <html lang="en">
      <head/>
      <body>
        <FavoritesProvider initialChannels={initialChannels}>
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
        </FavoritesProvider>
      </body>
    </html>
  );
};

export default RootLayout;

