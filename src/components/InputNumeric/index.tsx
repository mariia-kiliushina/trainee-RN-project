import React from 'react';
import {Input, InputProps} from 'components/Input';

export const InputNumeric = ({
  label,
  placeholder,
  editable,
  errorText,
}: InputProps) => {
  const validation = /\D+/;
  return (
    <Input
      validation={validation}
      keyboardType="number-pad"
      textContentType="password"
      label={label}
      errorText={errorText}
      placeholder={placeholder}
      editable={editable}
    />
  );
};
