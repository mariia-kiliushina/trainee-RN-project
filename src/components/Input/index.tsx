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
    <View style={styles.main}>
      <Typography textStyle={{color: labelTextColor}}>{label}</Typography>
      <View style={styles.shadowAndroid}>
        <TextInput
          {...props}
          style={[
            styles.textInput,
            styles.shadow,
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
      <Typography textStyle={{color: COLORS.desctructive500}}>
        {errorText}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // marginTop: 4,
    // marginBottom: 10,
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
  disabled: {
    borderColor: COLORS.neutral300,
  },
  shadowAndroid: {
    ...Platform.select({
      android: {
        elevation: 6,
        shadowColor: 'red',
        borderWidth: 3,
        borderColor: 'transparent',
        borderRadius: 9,
      },
    }),
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 9,
      },
    }),
  },
  error: {
    borderColor: COLORS.desctructive600,
  },
});
