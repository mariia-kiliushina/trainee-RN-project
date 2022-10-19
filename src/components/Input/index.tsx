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
  inputStyle?: StyleProp<TextStyle>;
};

export const Input = ({
  type,
  label,
  errorText,
  placeholder,
  children,
  validation,
  ...props
}: Props) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = type === 'disabled';
  const labelTextColor = isDisabled ? COLORS.neutral300 : COLORS.neutral900;

  const onChange = (inputValue: string) => {
    validation
      ? setText(inputValue.replace(validation, ''))
      : setText(inputValue);
  };

  return (
    <View>
      <Typography textStyle={[{color: labelTextColor}, styles.labelText]}>
        {label}
      </Typography>
      <View style={!isDisabled && styles.shadowAndroid}>
        <TextInput
          {...props}
          style={[
            styles.textInput,
            !isDisabled && styles.shadowIos,
            type ? styles[type] : null,
            isFocused && styles.focused,
          ]}
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
  disabled: {
    borderColor: COLORS.neutral300,
  },
  labelText: {marginVertical: 4},
  shadowPasswordAndroid: {
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: COLORS.shadow,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 9,
      },
    }),
  },
  shadowPasswordIos: {
    ...Platform.select({
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
  shadowAndroid: {
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: COLORS.shadow,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 9,
      },
    }),
  },
  shadowIos: {
    ...Platform.select({
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
  error: {
    borderColor: COLORS.desctructive600,
  },
  errorText: {
    color: COLORS.desctructive500,
    marginVertical: 8,
  },
});
