'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDrawer } from '@src/contexts/DrawerContext';
import { useRouter } from 'next/navigation';
import { logout } from '@src/utils/auth-helper';

type LogoutModalProps = {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ open, onClose }) => {
  const { onToggleDrawer } = useDrawer();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/videos');
    onToggleDrawer();
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Log out</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to log out?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="info" size="small" onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={handleLogout}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { LogoutModal };
