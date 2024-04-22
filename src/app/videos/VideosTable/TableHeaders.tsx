import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { useStore } from '@src/store/useStore';

const DesktopTableHeaders: React.FC = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
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
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  return (
    <TableRow>
      <TableCell padding="none">Date</TableCell>
      <TableCell padding="none" sx={{ pl: 1.5 }}>Title</TableCell>
      {isAuthenticated && <TableCell padding="none" align="right"></TableCell>}
    </TableRow>
  );
};

export { DesktopTableHeaders, MobileTableHeaders };
