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
      <View pointerEvents="none" style={{flex: 1}}>
        {/* <View style={{flex: 1}}> */}
        <Input
          shadow={false}
          keyboardType="number-pad"
          textContentType="password"
          label={label}
          errorText={errorText}
          autoCapitalize="none"
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
  pressed: {
    opacity: 0.7,
  },
  inputStyle: {
    height: 85,
    backgroundColor: COLORS.linear01,
  },
  labelStyle: {
    color: COLORS.base000,
  },
});
