import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Clocks} from 'assets/svg';
import {InputProps} from 'components/Input';
import {InputClickable} from '../InputClickable';

type PasswordInputProps = InputProps & {
  areSymbolsVisible?: boolean;
};

export const InputSearch = ({
  value,
  errorText,
  editable,
  ...props
}: PasswordInputProps) => {
  const iconColor = editable ? COLORS.neutral500 : COLORS.neutral300;

  return (
    <InputClickable
      onPress={() => {}}
      onBlur={() => {}}
      value={value}
      errorText={errorText}
      placeholder="Search"
      placeholderTextColor={COLORS.neutral100}
      inputStyle={styles.inputStyle}
      {...props}
    >
      <Pressable disabled={!editable} hitSlop={30}>
        <Clocks height={14} width={14} color={iconColor} style={styles.icon} />
      </Pressable>
    </InputClickable>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    paddingRight: 30,
    height: 40,
  },
  icon: {
    position: 'absolute',
    left: 12,
    top: 47,
  },
});
