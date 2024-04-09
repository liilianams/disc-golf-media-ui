'use client';

import * as React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import FavoriteIconButton from '@src/components/FavoriteIconButton';
import { useFavoriteChannels } from '@src/contexts/FavoritesContext';
import Title from '@src/components/Title';

const FavoriteChannels: React.FC = () => {
  const { favoriteChannels, removeFavoriteChannel } = useFavoriteChannels();

  return (
    <Container maxWidth="sm">
      <Title>Favorite Channels</Title>
      {favoriteChannels.length > 0 ? (
        <TableContainer>
          <Table size="small" sx={{ mt: 1.5 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favoriteChannels.map((channel) => (
                <TableRow hover key={channel.id}>
                  <TableCell align="left">
                    {channel.title}
                  </TableCell>
                  <TableCell align="right">
                    <FavoriteIconButton
                      tooltipTitle="Remove from Favorites"
                      buttonIcon={<Star/>}
                      onClick={() => removeFavoriteChannel(channel.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center" color="grey.500" paragraph>
          No channels to display
        </Typography>
      )}
    </Container>
  );
};

export default FavoriteChannels;
