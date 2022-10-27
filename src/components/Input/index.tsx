import React, {useState} from 'react';
import {Typography} from '../Typography';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Platform,
  Pressable,
} from 'react-native';
import {ArrowDown, HideEye, Clocks, IconsType} from 'src/assets/svg';
import {COLORS} from 'src/constants/colors';

export type InputProps = Omit<TextInputProps, 'onChangeText'> & {
  label?: string;
  errorText?: string | false;
  iconName?: 'arrow-down' | 'clocks' | 'hide-eye';
  iconColor?: string;
  isPressable?: boolean;
  onChangeText: (e: string) => void;
  onPress?: () => void;
  onIconPress?: () => void;
};

const icons: IconsType = {
  'arrow-down': ArrowDown,
  clocks: Clocks,
  'hide-eye': HideEye,
};

const ICON_SIZE = 16;
const INPUT_PADDING = 12;

export const Input = ({
  label,
  errorText,
  iconName,
  iconColor,
  isPressable,
  onChangeText,
  onPress,
  onIconPress,
  onBlur,
  editable = true,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const Icon = iconName ? icons[iconName] : null;

  const flattenStyle = StyleSheet.flatten([
    styles.textInput,
    Icon && styles.iconPadding,
    isFocused && styles.focused,
    editable && Boolean(errorText) && styles.error,
    !editable && styles.disabled,
  ]);

  const renderIcon = () => {
    if (Icon) {
      if (!isPressable) {
        return (
          <Pressable
            disabled={!editable}
            style={styles.iconPressable}
            hitSlop={30}
            onPress={onIconPress}
          >
            <Icon color={iconColor} height={ICON_SIZE} width={ICON_SIZE} />
          </Pressable>
        );
      } else {
        return (
          <View style={styles.iconPressable}>
            <Icon color={iconColor} height={ICON_SIZE} width={ICON_SIZE} />
          </View>
        );
      }
    }
  };

  return (
    <View style={styles.containerStyle}>
      {label && <Typography textStyle={styles.label}>{label}</Typography>}
      {isPressable?
return(null)
      :
return(null)
      }
      <View style={[styles.wrapper, editable && styles.shadow]}>
        <TextInput
          style={flattenStyle}
          placeholderTextColor={COLORS.neutral300}
          onChangeText={onChangeText}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={e => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
        {renderIcon()}
      </View>
      <Typography textStyle={styles.errorText}>
        {editable && errorText}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  iconPressable: {
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    right: INPUT_PADDING,
  },
  wrapper: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.neutral100,
    paddingHorizontal: INPUT_PADDING,
    paddingVertical: 10,
    backgroundColor: COLORS.base000,
  },
  iconPadding: {
    paddingRight: ICON_SIZE + INPUT_PADDING + 5,
  },
  focused: {
    borderColor: COLORS.warning300,
  },
  label: {
    marginVertical: 8,
    color: COLORS.neutral900,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: COLORS.shadow,
        borderRadius: 6,
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
  error: {
    borderColor: COLORS.desctructive600,
  },
  disabled: {
    borderColor: COLORS.neutral300,
  },
  errorText: {
    height: 20,
    color: COLORS.desctructive500,
    marginTop: 8,
  },
});
