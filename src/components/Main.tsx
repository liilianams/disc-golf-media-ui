import { Box, Container, Grid, Paper } from '@mui/material';
import * as React from 'react';
import { ReactNode } from 'react';
import Copyright from '../components/Copyright';

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pt: 7.5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {children}
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }}/>
      </Container>
    </Box>
  );
};

export default Main;