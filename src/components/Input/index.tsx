import React, {useState} from 'react';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';
import {
  StyleSheet,
  TextStyle,
  TextInput,
  StyleProp,
  TextInputProps,
  View,
  Platform,
} from 'react-native';

export type InputProps = Omit<TextInputProps, 'onChangeText'> & {
  label?: string;
  errorText?: string | false;
  children?: React.ReactNode;
  validation?: RegExp;
  onChangeText: (e: string) => void;
  value: string;
  containerStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  shadow?: boolean;
};

export const Input = ({
  label,
  errorText,
  children,
  validation,
  containerStyle,
  inputStyle,
  onBlur,
  labelStyle,
  onChangeText,
  editable = true,
  shadow = true,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const labelTextStyle = [
    styles.label,
    labelStyle,
    !editable && styles.labelDisabled,
  ];

  const flattenStyle = StyleSheet.flatten([
    styles.textInput,
    isFocused && styles.focused,
    inputStyle,
    editable && Boolean(errorText) && styles.error,
    !editable && styles.disabled,
  ]);

  const onChange = (inputValue: string) => {
    validation
      ? onChangeText(inputValue.replace(validation, ''))
      : onChangeText(inputValue);
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {label && <Typography textStyle={labelTextStyle}>{label}</Typography>}
      <View style={[editable && shadow && styles.shadow, styles.wrapper]}>
        <TextInput
          style={flattenStyle}
          onChangeText={onChange}
          placeholderTextColor={COLORS.neutral300}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={e => {
            setIsFocused(false);
            if (onBlur) {
              onBlur(e);
            }
          }}
          editable={editable}
          {...props}
        />
      </View>
      {children}
      <Typography textStyle={styles.errorText}>
        {editable && errorText}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.neutral100,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: COLORS.base000,
  },
  focused: {
    borderColor: COLORS.warning300,
  },
  label: {
    marginVertical: 8,
    color: COLORS.neutral900,
  },
  labelDisabled: {
    color: COLORS.neutral300,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: COLORS.shadow,
        borderRadius: 6,
      },
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  /*eslint-disable react-native/no-unused-styles */
  error: {
    borderColor: COLORS.desctructive600,
  },
  disabled: {
    borderColor: COLORS.neutral300,
  },
  /*eslint-enable react-native/no-unused-styles */
  errorText: {
    height: 20,
    color: COLORS.desctructive500,
    marginTop: 8,
  },
});
