'use client';

import Typography from '@mui/material/Typography';
import * as React from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider
} from '@mui/material';
import { AccountCircle, Email } from '@mui/icons-material';
import Title from '@src/components/Title';
import { User } from '@src/entities/User';

type AccountProps = {
  user: User;
}

const Account: React.FC<AccountProps> = ({ user }) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleDeleteAccount = async () => {
    const response = { data: 'data' }; //await deleteAccount();
    if (response) {
      setErrorMessage(response.data);
    }
    setOpenModal(false);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '200px',
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircle/>
        </Avatar>
        <Title>Account</Title>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Email sx={{ color: 'lightgrey', mr: 1 }}/>
          <Typography variant="body2">
            {user?.email}
          </Typography>
        </Box>
        <Box sx={{ height: '100%', mt: 'auto', width: '100%' }}>
          <Divider sx={{ color: 'black', my: 1 }}/>
          <Button color="error" size="small" onClick={() => setOpenModal(true)}>
            Delete Account
          </Button>
          <Alert severity="error" sx={{ display: errorMessage !== '' ? 'flex' : 'none', alignItems: 'center', mb: 1 }}>
            {errorMessage}
          </Alert>
          <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete your account and all associated data?
                This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="primary" size="small" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="error" size="small" onClick={handleDeleteAccount}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Container>
  );
};

export default Account;