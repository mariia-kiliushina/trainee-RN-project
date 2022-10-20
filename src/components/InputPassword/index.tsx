import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {HideEye} from 'assets/svg';
import {Clocks} from 'assets/svg';
import {Input} from 'components/Input';
type Props = TextInputProps & {
  label: string;
  errorText?: string | false;
  disabled?: boolean;
  children?: React.ReactNode;
  placeholder?: string;
  areSymbolsVisible?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  onBlur?:
    | (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
        (() => void))
    | ((e: any) => void);
};

const useToggle = (initialState: any): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = () => setState(prevState => !prevState);

  return [state, toggle];
};

export const InputPassword = ({
  label,
  errorText,
  disabled = false,
  onBlur,
  ...props
}: Props) => {
  const [areSymbolsHidden, toggleSymbolsVisibility] = useToggle(true);

  const iconColor = disabled ? COLORS.neutral300 : COLORS.neutral500;

  return (
    <Input
      textContentType="password"
      label={label}
      secureTextEntry={areSymbolsHidden}
      placeholder="Enter your password"
      errorText={errorText}
      autoCapitalize="none"
      inputStyle={styles.inputStyle}
      disabled={disabled}
      onBlur={onBlur}
      {...props}>
      <Pressable
        disabled={disabled}
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
