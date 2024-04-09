import React from 'react';
import { IconButton, InputAdornment, SxProps, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

type InputFormTextFieldProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  error: boolean;
  helperText: string;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  sx: SxProps;
}

const InputFormTextField: React.FC<InputFormTextFieldProps> = ({
  id,
  label,
  name,
  type = 'text',
  value,
  error,
  helperText,
  disabled = false,
  autoFocus = false,
  autoComplete = 'off',
  onChange,
  onClear,
  sx
}) => {
  return (
    <TextField
      size="small"
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      error={error}
      helperText={helperText}
      disabled={disabled}
      sx={sx}
      InputProps={value ? {
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

export { InputFormTextField };
