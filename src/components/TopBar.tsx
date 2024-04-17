'use client';

import { AccountCircle, Login, Menu } from '@mui/icons-material';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import * as React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSmallBreakpoint } from '../utils/hooks';
import BasketIcon from './BasketIcon';
import { useRouter } from 'next/navigation';
import { useDrawer } from '@src/contexts/DrawerContext';
import { useAuth } from '@src/contexts/AuthContext';

const TopBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isOpen, onToggleDrawer } = useDrawer();
  const router = useRouter();
  const isSmallScreen = useSmallBreakpoint();
  const marginRight = '36px';

  return (
    <AppBar position="absolute">
      <Toolbar sx={{ pr: 2 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close drawer"
          onClick={onToggleDrawer}
          sx={{
            marginRight: marginRight,
            ...(!isOpen && { display: 'none' }),
          }}
        >
          <ChevronLeftIcon/>
        </IconButton>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onToggleDrawer}
          sx={{
            marginRight: marginRight,
            ...(isOpen && { display: 'none' }),
          }}
        >
          <Menu/>
        </IconButton>
        <Box
          display="flex"
          justifyContent={isSmallScreen ? 'center' : 'left'}
          alignItems="center"
          marginRight="64px"
          flexGrow={1}
          sx={{ cursor: 'pointer' }}
          onClick={() => router.push('/videos')}
        >
          <BasketIcon/>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            align={isSmallScreen ? 'center' : 'left'}
          >
            Disc Golf Media
          </Typography>
        </Box>
        {isAuthenticated ? (
          <IconButton href="/account" color="inherit" sx={{ p: 0 }} aria-label="view account">
            <AccountCircle/>
          </IconButton>
        ) : (
          <IconButton href="/login" color="inherit" sx={{ p: 0 }} aria-label="log in">
            <Login/>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
