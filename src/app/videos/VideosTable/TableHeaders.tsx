import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useAuth } from '@src/contexts/AuthContext';

const DesktopTableHeaders: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <TableRow>
      <TableCell sx={{ width: '120px ' }}>Published</TableCell>
      <TableCell>Title</TableCell>
      <TableCell align="right">Channel</TableCell>
      {isAuthenticated && <TableCell align="right"></TableCell>}
    </TableRow>
  );
};

const MobileTableHeaders: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <TableRow>
      <TableCell padding="none">Date</TableCell>
      <TableCell padding="none" sx={{ pl: 1.5 }}>Title</TableCell>
      {isAuthenticated && <TableCell padding="none" align="right"></TableCell>}
    </TableRow>
  );
};

export { DesktopTableHeaders, MobileTableHeaders };
