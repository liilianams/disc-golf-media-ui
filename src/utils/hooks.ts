import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { SMALL_SCREEN_BREAKPOINT } from './constants';

const useSmallBreakpoint = () => {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down(SMALL_SCREEN_BREAKPOINT));
};

export { useSmallBreakpoint };