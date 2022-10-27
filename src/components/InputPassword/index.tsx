import React, {useState} from 'react';
import {Input, InputProps} from 'components/Input';
import {COLORS} from 'src/constants/colors';

type PasswordInputProps = InputProps & {
  areSymbolsVisible?: boolean;
};

export const InputPassword = ({
  label,
  errorText,
  editable,
  ...props
}: PasswordInputProps) => {
  const [areSymbolsHidden, toggleSymbolsVisibility] = useState(true);

  const changeSymbolsVisibility = () => {
    toggleSymbolsVisibility(prevState => !prevState);
  };

  const iconColor = editable ? COLORS.neutral500 : COLORS.neutral300;
  const iconName = areSymbolsHidden ? 'hide-eye' : 'clocks';

  return (
    <Input
      label={label}
      secureTextEntry={areSymbolsHidden}
      placeholder="Enter your password"
      errorText={errorText}
      autoCapitalize="none"
      onBlur={changeSymbolsVisibility}
      iconName={iconName}
      onIconPress={changeSymbolsVisibility}
      iconColor={iconColor}
      {...props}
    />
  );
};
