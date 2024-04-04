import * as React from 'react';
import { IconButton, Tooltip } from '@mui/material';

type FavoriteIconButtonProps = {
  tooltipTitle: string;
  buttonIcon: React.ReactNode;
  onClick: (event: React.MouseEvent | undefined) => void;
}


const FavoriteIconButton: React.FC<FavoriteIconButtonProps> = ({ tooltipTitle, buttonIcon, onClick }) => {
  return <Tooltip title={tooltipTitle} placement="top-start">
    <IconButton
      sx={{ p: 0, color: 'warning.main', opacity: '75%' }}
      onClick={onClick}
    >
      {buttonIcon}
    </IconButton>
  </Tooltip>;
};

export default FavoriteIconButton;
