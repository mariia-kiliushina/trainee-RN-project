import React, {useState} from 'react';
import {
  StyleSheet,
  TextStyle,
  TextInput,
  StyleProp,
  TextInputProps,
  View,
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
  inputStyle,
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
    <View style={styles.main}>
      <Typography textStyle={{color: labelTextColor}}>{label}</Typography>
      <TextInput
        {...props}
        style={[
          styles.textInput,
          styles.shadow,
          inputStyle,
          type ? styles[type] : undefined,
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
      {children}
      <Typography textStyle={{color: COLORS.desctructive500}}>
        {errorText}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {marginBottom: 10},
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.neutral100,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  focused: {
    borderColor: COLORS.warning100,
  },
  disabled: {
    shadowOffset: {
      width: 1,
      height: 2,
    },
    borderColor: COLORS.neutral300,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  shadow: {
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'white',
    elevation: 6,
  },
  error: {
    borderColor: COLORS.desctructive600,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.05,
    elevation: 2,
  },
  // focusedInputShadow: {
  //   shadowOffset: {
  //     width: 0,
  //     height: 0,
  //   },
  //   shadowOpacity: 1,
  //   shadowColor: COLORS.warning300,
  //   shadowRadius: 4,
  //   backgroundColor: 'white',
  //   elevation: 4,
  //   // marginTop: 4,
  //   // marginBottom: 8,
  // },
});
