'use client';

import { AccountCircle, Login, Logout, Star, VideoLibrary } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useSmallBreakpoint } from '@src/utils/hooks';
import { convertDisplayStringToIdString } from '@src/utils/helpers';
import { useDrawer } from '@src/contexts/DrawerContext';
import { LogoutModal } from '@src/components/LogOutModal';

type RouteItem = {
  href?: string;
  label: string;
  icon: React.ComponentType;
  condition: boolean;
  onClick?: () => void;
}

type ItemProps = {
  isAuthenticated: boolean;
  isOpen?: boolean;
}

type ListItemButtonStyledProps = {
  href?: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ListItemButtonStyled: React.FC<ListItemButtonStyledProps> = ({ href, label, icon, onClick }) => {
  const { handleDrawerButtonClick } = useDrawer();
  const isSmallScreen = useSmallBreakpoint();

  const hrefProp = href !== undefined ? { href } : {};

  return (
    <ListItemButton
      {...hrefProp}
      onClick={onClick ? onClick : () => handleDrawerButtonClick(isSmallScreen)}
    >
      <ListItemIcon sx={{ minWidth: isSmallScreen ? '40px' : '50px' }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} sx={{ whiteSpace: 'nowrap', pr: isSmallScreen ? 1 : 0 }}/>
    </ListItemButton>
  );
};

const PrimaryItems: React.FC<ItemProps> = ({ isAuthenticated }) => {
  const routes: RouteItem[] = [
    { href: '/videos', label: 'Videos', icon: VideoLibrary, condition: true },
    { href: '/favorites', label: 'Favorites', icon: Star, condition: isAuthenticated }
  ];

  return (
    <>
      {routes.map(route => route.condition && (
        <ListItemButtonStyled
          key={convertDisplayStringToIdString(route.label)}
          href={route.href}
          label={route.label}
          icon={<route.icon/>}
        />
      ))}
    </>
  );
};

const SecondaryItems: React.FC<ItemProps> = ({ isAuthenticated, isOpen }) => {
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);

  const routes: RouteItem[] = [
    { href: '/account', label: 'Account', icon: AccountCircle, condition: isAuthenticated },
    { label: 'Log Out', icon: Logout, condition: isAuthenticated, onClick: () => setOpenLogoutModal(!openLogoutModal) },
    { href: '/login', label: 'Log In', icon: Login, condition: !isAuthenticated }
  ];

  return (
    <>
      {isAuthenticated && <ListSubheader component="div" sx={{ opacity: isOpen ? 1 : 0 }}>Settings</ListSubheader>}
      {routes.map(route => route.condition && (
        <ListItemButtonStyled
          key={convertDisplayStringToIdString(route.label)}
          href={route.href}
          label={route.label}
          icon={<route.icon/>}
          onClick={route.onClick}
        />
      ))}
      <LogoutModal open={openLogoutModal} onClose={setOpenLogoutModal}/>
    </>
  );
};

export { PrimaryItems, SecondaryItems };
