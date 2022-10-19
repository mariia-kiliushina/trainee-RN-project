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
  const [areSymbolsHidden, toggleSymbolsVisibility] = useToggle(true);
  const isDisabled = type === 'disabled';

  const iconColor = isDisabled ? COLORS.neutral300 : COLORS.neutral500;

  return (
    <Input
      type={type}
      textContentType="password"
      label={label}
      secureTextEntry={areSymbolsHidden}
      placeholder="Enter your password"
      errorText={errorText}
      autoCapitalize="none"
      inputStyle={styles.inputStyle}>
      <Pressable
        disabled={isDisabled}
        style={styles.buttonHide}
        hitSlop={30}
        onPress={toggleSymbolsVisibility}>
        {areSymbolsHidden ? (
          <HideEye width={14} color={iconColor} />
        ) : (
          <Clocks width={14} color={iconColor} />
        )}
      </Pressable>
    </Input>
  );
};

const styles = StyleSheet.create({
  buttonHide: {
    position: 'absolute',
    right: 12,
    height: 14,
    width: 14,
    justifyContent: 'center',
    top: 47,
  },
  inputStyle: {
    paddingRight: 30,
  },
});
