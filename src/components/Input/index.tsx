import React, {useState} from 'react';
import {
  StyleSheet,
  TextStyle,
  TextInput,
  StyleProp,
  TextInputProps,
  View,
  Platform,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';

type Props = TextInputProps & {
  label: string;
  errorText?: string | false;
  disabled?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
  validation?: RegExp;
  containerStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onBlur?:
    | (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
        (() => void))
    | ((e: any) => void);
};

export const Input = ({
  label,
  errorText,
  disabled = false,
  placeholder,
  children,
  validation,
  containerStyle,
  inputStyle,
  onBlur,
  ...props
}: Props) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const labelTextStyle = [styles.label, disabled && styles.labelDisabled];

  const flattenStyle = StyleSheet.flatten([
    styles.textInput,
    inputStyle,
    isFocused && styles.focused,
    !disabled && Boolean(errorText) && styles.error,
    disabled && styles.disabled,
  ]);

  const onChange = (inputValue: string) => {
    validation
      ? setText(inputValue.replace(validation, ''))
      : setText(inputValue);
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Typography textStyle={labelTextStyle}>{label}</Typography>
      <View style={[!disabled && styles.shadow, styles.wrapper]}>
        <TextInput
          style={flattenStyle}
          onChangeText={onChange}
          value={text}
          placeholder={placeholder}
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
          editable={!disabled}
          selectTextOnFocus={!disabled}
          {...props}
        />
      </View>
      {children}
      <Typography textStyle={styles.errorText}>
        {!disabled && errorText}
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.base000,
  },
  focused: {
    borderColor: COLORS.warning100,
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
    marginVertical: 8,
  },
});
