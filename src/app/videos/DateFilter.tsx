import en from 'date-fns/locale/en-US';
import * as React from 'react';
import { Dialog, IconButton, InputAdornment, styled, useTheme } from '@mui/material';
import { useSmallBreakpoint } from '@src/utils/hooks';
import { CalendarIcon, ClearIcon, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type DateFilterProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ value, onChange }) => {
  const theme = useTheme();
  const isSmallScreen = useSmallBreakpoint();
  const fontSize = isSmallScreen ? theme.typography.body1.fontSize : theme.typography.body2.fontSize;

  const StyledDialog = styled(Dialog)({
    '& .MuiDateCalendar-root': {
      maxHeight: '280px',
    }
  });

  const onIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en}>
      <MobileDatePicker
        value={value}
        defaultValue={null}
        onChange={onChange}
        closeOnSelect
        views={['day']}
        format="dd/MM/yyyy"
        maxDate={new Date()}
        slots={{
          dialog: StyledDialog
        }}
        slotProps={{
          field: { clearable: true },
          textField: {
            placeholder: 'Select date',
            size: 'small',
            fullWidth: true,
            inputProps: {
              style: { fontSize: fontSize },
            },
            InputProps: {
              endAdornment: (
                <>
                  {value && (
                    <InputAdornment position="end">
                      <IconButton onClick={onIconClick} color="inherit" sx={{ p: 0 }}>
                        <ClearIcon/>
                      </IconButton>
                    </InputAdornment>
                  )}
                  <InputAdornment position="end">
                    <IconButton color="inherit" sx={{ p: 0 }}>
                      <CalendarIcon/>
                    </IconButton>
                  </InputAdornment>
                </>
              ),
            },
          },
          toolbar: { hidden: true, },
          actionBar: { actions: ['clear', 'accept'], },
        }}
      />
    </LocalizationProvider>
  );
};

export { DateFilter };