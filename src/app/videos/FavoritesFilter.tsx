import { FormControlLabel, Switch } from '@mui/material';
import * as React from 'react';
import { useSmallBreakpoint } from '../../utils/hooks';

type FavoritesFilterProps = {
  checkedValue: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FavoritesFilter: React.FC<FavoritesFilterProps> = ({ checkedValue, onChange }) => {
  const isSmallScreen = useSmallBreakpoint();

  return (
    <FormControlLabel
      control={<Switch
        onChange={onChange}
        color="warning"
        checked={checkedValue}
      />}
      id="favorites-filter"
      label="Show favorites"
      labelPlacement="start"
      slotProps={{
        typography: {
          variant: isSmallScreen ? 'body1' : 'body2',
          color: 'grey.500',
        }
      }}
      sx={{ ml: 0 }}
    />
  );
};

export { FavoritesFilter };