import React, {useState} from 'react';
import {
  StyleSheet,
  TextStyle,
  TextInput,
  StyleProp,
  TextInputProps,
  View,
  Platform,
} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';

type Props = TextInputProps & {
  label: string;
  type?: 'disabled' | 'error';
  errorText?: string;
  children?: React.ReactNode;
  placeholder?: string;
  validation?: RegExp;
  containerStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export const Input = ({
  type,
  label,
  errorText,
  placeholder,
  children,
  validation,
  containerStyle,
  inputStyle,
  ...props
}: Props) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = type === 'disabled';

  const labelTextStyle = [styles.label, isDisabled && styles.labelDisabled];

  const flattenStyle = StyleSheet.flatten([
    styles.textInput,
    type ? styles[type] : null,
    inputStyle,
    isFocused && styles.focused,
  ]);

  const onChange = (inputValue: string) => {
    validation
      ? setText(inputValue.replace(validation, ''))
      : setText(inputValue);
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Typography textStyle={labelTextStyle}>{label}</Typography>
      <View style={!isDisabled && styles.shadow}>
        <TextInput
          style={flattenStyle}
          onChangeText={onChange}
          value={text}
          placeholder={placeholder}
          placeholderTextColor={COLORS.neutral300}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          editable={!isDisabled}
          selectTextOnFocus={!isDisabled}
          {...props}
        />
      </View>
      {children}
      <Typography textStyle={styles.errorText}>{errorText}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'space-between',
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
  },
  labelDisabled: {
    color: COLORS.neutral300,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: COLORS.shadow,
        borderWidth: 1,
        borderColor: 'transparent',
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
    color: COLORS.desctructive500,
    marginVertical: 8,
  },
});
