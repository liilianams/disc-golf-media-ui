'use client';

import { Box, Divider, Drawer, List, styled, Toolbar } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import * as React from 'react';
import { DRAWER_WIDTH, SMALL_SCREEN_BREAKPOINT } from '@src/utils/constants';
import { PrimaryItems, SecondaryItems } from './Items';
import { useSmallBreakpoint } from '@src/utils/hooks';
import { useDrawer } from '@src/contexts/DrawerContext';
import { useAuth } from '@src/contexts/AuthContext';

const DrawerStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(6),
        [theme.breakpoints.up(SMALL_SCREEN_BREAKPOINT)]: {
          width: theme.spacing(8),
        },
      }),
    },
  }),
);

const NavDrawer: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isOpen, onToggleDrawer } = useDrawer();
  const isSmallScreen = useSmallBreakpoint();

  const drawerContents = (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
      </Toolbar>
      <List component="nav">
        <PrimaryItems isAuthenticated={isAuthenticated}/>
      </List>
      <Box component="nav" sx={{ position: 'absolute', bottom: '0', mb: 1, width: '100%' }}>
        <Divider/>
        <List component="nav">
          <SecondaryItems isAuthenticated={isAuthenticated} isOpen={isOpen}/>
        </List>
      </Box>
    </>
  );

  return (
    <>
      {isSmallScreen ? (
        <Drawer
          variant="temporary"
          sx={{ flexShrink: 0, width: DRAWER_WIDTH }}
          anchor="left"
          open={isOpen}
          onClose={onToggleDrawer}
        >
          {drawerContents}
        </Drawer>
      ) : (
        <DrawerStyled variant="permanent" open={isOpen}>
          {drawerContents}
        </DrawerStyled>
      )}
    </>
  );
};

export { NavDrawer };