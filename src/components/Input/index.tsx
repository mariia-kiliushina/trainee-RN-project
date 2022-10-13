import React, {SetStateAction, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS} from 'src/constants/colors';

type Props = {
  type: 'focused' | 'disabled';
};

export const Input = ({type}: Props) => {
  const [text, setText] = useState('');

  const onChange = (inputValue: SetStateAction<string>) => {
    setText(inputValue);
  };
  return (
    <TextInput
      style={[styles.textInput, styles.shadow, styles[type]]}
      onChangeText={onChange}
      value={text}
      placeholder="Enter your account no"
    />
  );
};

const styles = StyleSheet.create({
  focused: {
    borderColor: COLORS.warning100,
  },
  disabled: {
    borderColor: COLORS.neutral300,
    shadowOpacity: 0.05,
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

  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.neutral100,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
