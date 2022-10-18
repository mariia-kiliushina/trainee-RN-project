import React, {useState} from 'react';
import {Pressable, StyleProp, StyleSheet, TextStyle} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {HideEye} from 'assets/svg';
import {Clocks} from 'assets/svg';
import {Input} from 'components/Input';
type Props = {
  label: string;
  type?: 'disabled' | 'error';
  errorText?: string;
  children?: React.ReactNode;
  placeholder?: string;
  areSymbolsVisible?: boolean;
  inputStyle?: StyleProp<TextStyle>;
};

const useToggle = (initialState: any): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = () => setState(prevState => !prevState);

  return [state, toggle];
};

export const InputPassword = ({type, label, errorText}: Props) => {
  const [areSymbolsVisible, toggleSymbolsVisibility] = useToggle(false);
  const isDisabled = type === 'disabled';

  return (
    <Input
      type={type}
      textContentType="password"
      label={label}
      secureTextEntry={areSymbolsVisible}
      placeholder="Enter your password"
      errorText={errorText}
      autoCapitalize="none"
      inputStyle={[styles.textInput, styles.shadow]}>
      <Pressable
        disabled={isDisabled}
        style={styles.buttonHide}
        hitSlop={30}
        onPress={toggleSymbolsVisibility}>
        {areSymbolsVisible && <Clocks width={14} color={COLORS.neutral500} />}
        {!areSymbolsVisible && <HideEye width={14} color={COLORS.neutral500} />}
      </Pressable>
    </Input>
  );
};

const styles = StyleSheet.create({
  buttonHide: {
    position: 'absolute',
    top: 35,
    right: 12,
    height: 14,
    width: 14,
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.neutral100,
    paddingLeft: 12,
    paddingRight: 27,
    paddingVertical: 10,
  },
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
});
