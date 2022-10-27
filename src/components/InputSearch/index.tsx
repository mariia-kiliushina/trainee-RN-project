import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Clocks} from 'assets/svg';
import {Input, InputProps} from 'components/Input';

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
    <Input
      onBlur={() => {}}
      value={value}
      errorText={errorText}
      placeholder="Search"
      placeholderTextColor={COLORS.neutral100}
      {...props}
    >
      <Pressable disabled={!editable} hitSlop={30}>
        <Clocks height={14} width={14} color={iconColor} style={styles.icon} />
      </Pressable>
    </Input>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    left: 12,
    top: 47,
  },
});
