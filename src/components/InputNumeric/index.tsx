import React from 'react';
import {Input, InputProps} from 'components/Input';

export const InputNumeric = ({label, errorText, ...props}: InputProps) => {
  const validation = /\D+/;
  return (
    <Input
      validation={validation}
      keyboardType="number-pad"
      textContentType="password"
      label={label}
      placeholder="Enter your password"
      errorText={errorText}
      autoCapitalize="none"
      {...props}
    />
  );
};
