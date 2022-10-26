import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {HideEye} from 'assets/svg';
import {Clocks} from 'assets/svg';
import {Input, InputProps} from 'components/Input';

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
  const changeSymbolsVisibility = () =>
    toggleSymbolsVisibility(prevState => !prevState);

  const iconColor = editable ? COLORS.neutral500 : COLORS.neutral300;

  return (
    <Input
      textContentType="password"
      label={label}
      secureTextEntry={areSymbolsHidden}
      placeholder="Enter your password"
      errorText={errorText}
      autoCapitalize="none"
      inputStyle={styles.inputStyle}
      {...props}
    >
      <Pressable
        disabled={!editable}
        style={styles.buttonHide}
        hitSlop={30}
        onPress={changeSymbolsVisibility}
      >
        {areSymbolsHidden ? (
          <HideEye width={14} color={iconColor} />
        ) : (
          <Clocks width={14} color={iconColor} />
        )}
      </Pressable>
    </Input>
  );
};

const styles = StyleSheet.create({
  buttonHide: {
    position: 'absolute',
    right: 12,
    height: 14,
    width: 14,
    justifyContent: 'center',
    top: 47,
  },
  inputStyle: {
    paddingRight: 30,
  },
});
