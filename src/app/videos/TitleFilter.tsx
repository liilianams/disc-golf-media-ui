import { IconButton, InputAdornment, SxProps, TextField, useTheme } from '@mui/material';
import * as React from 'react';
import { useSmallBreakpoint } from '../../utils/hooks';
import { ClearIcon } from '@mui/x-date-pickers';

type TitleFilterProps = {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const TitleFilter: React.FC<TitleFilterProps> = ({ value, onChange, onClear }) => {
  const theme = useTheme();
  const isSmallScreen = useSmallBreakpoint();
  const fontSize = isSmallScreen ? theme.typography.body1.fontSize : theme.typography.body2.fontSize;

  const disableWebkitCancelButton: SxProps = {
    '& input[type="search"]::-webkit-search-decoration': {
      display: 'none',
    },
    '& input[type="search"]::-webkit-search-cancel-button': {
      display: 'none',
    },
    '& input[type="search"]::-webkit-search-results-button': {
      display: 'none',
    },
    '& input[type="search"]::-webkit-search-results-decoration': {
      display: 'none',
    },
  };

  return (
    <TextField
      id="video-channel-title-filter"
      size="small"
      placeholder="Search videos & channels"
      type="search"
      value={value}
      onChange={onChange}
      fullWidth
      sx={isSmallScreen ? disableWebkitCancelButton : {}}
      inputProps={{
        style: { fontSize: fontSize }
      }}
      InputProps={isSmallScreen && value ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onClear} color="inherit" sx={{ p: 0 }}>
              <ClearIcon/>
            </IconButton>
          </InputAdornment>
        ),
      } : {}}
    />
  );
};

export { TitleFilter };