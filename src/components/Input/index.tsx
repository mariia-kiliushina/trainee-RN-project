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
};

export const Input = ({
  type,
  label,
  errorText,
  placeholder,
  children,
  validation,
  containerStyle,
  ...props
}: Props) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = type === 'disabled';

  const labelTextStyle = [
    {color: isDisabled ? COLORS.neutral300 : COLORS.neutral900},
    styles.labelText,
  ];

  const flattenStyle = StyleSheet.flatten([
    styles.textInput,
    type ? styles[type] : null,
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
          {...props}
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
    backgroundColor: 'white',
  },
  focused: {
    borderColor: COLORS.warning100,
  },
  labelText: {
    marginVertical: 8,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: COLORS.shadow,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 9,
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
