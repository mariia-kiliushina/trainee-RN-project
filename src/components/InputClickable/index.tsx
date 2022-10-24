import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Input, InputProps} from 'components/Input';
// import {InputProps} from 'components/Input';

type ClickableInputProps = InputProps & {
  onPress: () => void;
  selected?: boolean;
};

export const InputClickable = ({
  label,
  errorText,
  inputStyle,
  labelStyle,
  children,
  onPress,
  selected,
  ...props
}: ClickableInputProps) => {
  return (
    <Pressable
      style={({pressed}) => [pressed && styles.pressed]}
      onPress={onPress}
    >
      <View pointerEvents="none" style={styles.main}>
        <Input
          shadow={false}
          keyboardType="number-pad"
          textContentType="password"
          label={label}
          errorText={errorText}
          autoCapitalize="none"
          inputStyle={[
            styles.inputStyle,
            inputStyle,
            selected && styles.inputSelectedStyle,
          ]}
          labelStyle={[styles.labelStyle, labelStyle]}
          {...props}
        >
          {children}
        </Input>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },

  inputStyle: {
    height: 85,
    color: COLORS.neutral900,
  },
  inputSelectedStyle: {
    backgroundColor: COLORS.warning500,
    color: COLORS.base000,
  },
  labelStyle: {
    color: COLORS.neutral400,
  },
});
