import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Input} from 'components/Input';
type Props = {
  label: string;
  errorText?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
  areSymbolsVisible?: boolean;
  inputStyle?: StyleProp<TextStyle>;
};

export const InputNumeric = ({
  label,
  placeholder,
  disabled,
  errorText,
}: Props) => {
  const validation = /\D+/;
  return (
    <Input
      validation={validation}
      keyboardType="number-pad"
      textContentType="password"
      label={label}
      errorText={errorText}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

// const styles = StyleSheet.create({});
