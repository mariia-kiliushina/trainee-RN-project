import React, {SetStateAction, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';

type Props = {
  label: string;
  type?: 'disabled' | 'error';
  errorText?: string;
};

export const InputAccount = ({type, label, errorText}: Props) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isDisabled = type === 'disabled';
  const labelTextColor = isDisabled ? COLORS.neutral300 : COLORS.neutral900;
  const style = type ? styles[type] : undefined;

  const onChange = (inputValue: SetStateAction<string>) => {
    setText(inputValue);
  };

  return (
    <View style={styles.main}>
      <Typography textStyle={{color: labelTextColor}}>{label}</Typography>
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
        placeholder="Enter your account no"
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
      height: 6,
    },
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'white',
    elevation: 12,
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
