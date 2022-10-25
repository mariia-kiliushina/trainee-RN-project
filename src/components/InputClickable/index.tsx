import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Input, InputProps} from 'components/Input';
// import {InputProps} from 'components/Input';

type ClickableInputProps = InputProps & {
  onPress: () => void;
};

export const InputClickable = ({
  label,
  errorText,
  inputStyle,
  labelStyle,
  children,
  onPress,
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
          label={label}
          errorText={errorText}
          inputStyle={[styles.inputStyle, inputStyle]}
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
    color: COLORS.neutral900,
  },

  labelStyle: {
    color: COLORS.neutral400,
  },
});
