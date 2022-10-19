import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Input} from 'components/Input';
type Props = {
  label: string;
  type?: 'disabled' | 'error';
  errorText?: string;
  children?: React.ReactNode;
  placeholder?: string;
  areSymbolsVisible?: boolean;
  inputStyle?: StyleProp<TextStyle>;
};

export const InputNumeric = ({type, label, placeholder, errorText}: Props) => {
  const validation = /\D+/;
  return (
    <Input
      validation={validation}
      type={type}
      keyboardType="number-pad"
      textContentType="password"
      label={label}
      errorText={errorText}
      placeholder={placeholder}
    />
  );
};

// const styles = StyleSheet.create({});
