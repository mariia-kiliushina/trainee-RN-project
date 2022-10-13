import React, {SetStateAction, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';

type Props = {
  label: string;
  type?: 'disabled' | 'error';
  errorText?: string;
};

export const InputPassword = ({type, label, errorText}: Props) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (inputValue: SetStateAction<string>) => {
    setText(inputValue);
  };

  const labelTextColor =
    type === 'disabled' ? COLORS.neutral300 : COLORS.neutral900;

  const style = type ? styles[type] : undefined;

  return (
    <View style={[styles.main]}>
      <Typography textStyle={{color: labelTextColor}}>{label}</Typography>
      <View
        style={[
          styles.basicInputWrapper,
          isFocused && styles.focusedInputWrapper,
        ]}>
        <TextInput
          autoFocus={true}
          style={[
            styles.textInput,
            styles.shadow,
            style,
            isFocused && styles.focused,
          ]}
          onChangeText={onChange}
          value={text}
          placeholder="Enter your password"
          placeholderTextColor={COLORS.neutral300}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          editable={type !== 'disabled'}
          selectTextOnFocus={type !== 'disabled'}
        />
      </View>
      {errorText && (
        <Typography textStyle={{color: COLORS.desctructive500}}>
          {errorText}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {height: 96},
  basicInputWrapper: {
    marginTop: 4,
    marginBottom: 8,
  },
  focusedInputWrapper: {
    borderWidth: 4,
    borderRadius: 10,
    borderColor: COLORS.primary100,
  },

  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.neutral100,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  focused: {
    borderColor: COLORS.warning300,
  },
  disabled: {},
  shadow: {
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowColor: COLORS.shadow,
    shadowRadius: 4,
    backgroundColor: 'white',
    elevation: 2,
  },
  labelText: {},

  error: {
    borderColor: COLORS.desctructive600,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.05,
    elevation: 2,
  },
});
