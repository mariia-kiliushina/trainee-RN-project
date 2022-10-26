import React, {useState} from 'react';
import {Typography} from '../Typography';
import {
  StyleSheet,
  TextStyle,
  TextInput,
  StyleProp,
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
  children?: React.ReactNode;
  validation?: RegExp;
  onChangeText: (e: string) => void;
  value: string;
  containerStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<TextStyle>;
  iconName?: 'arrow-down' | 'clocks' | 'hide-eye';
  iconColor?: string;
  onIconPress?: () => void;
  onPress?: () => void;
  pressable?: boolean;
};

export const Input = ({
  label,
  errorText,
  validation,
  containerStyle,
  inputStyle,
  onBlur,
  labelStyle,
  onChangeText,
  onPress,
  editable = true,
  iconName,
  onIconPress,
  iconColor,
  iconStyle,
  pressable = false,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const labelTextStyle = [
    styles.label,
    labelStyle,
    !editable && styles.labelDisabled,
  ];

  const flattenStyle = StyleSheet.flatten([
    styles.textInput,
    isFocused && styles.focused,
    inputStyle,
    editable && Boolean(errorText) && styles.error,
    !editable && styles.disabled,
  ]);

  const onChange = (inputValue: string) => {
    validation
      ? onChangeText(inputValue.replace(validation, ''))
      : onChangeText(inputValue);
  };

  const icons: IconsType = {
    'arrow-down': ArrowDown,
    clocks: Clocks,
    'hide-eye': HideEye,
  };

  const Icon = iconName ? icons[iconName] : null;

  // const WrapperComponent = () => {
  //   if (pressable) {
  //     return (
  //       <Pressable
  //         style={({pressed}) => [pressed && styles.pressed]}
  //         onPress={() => {
  //           console.log('666666666');
  //           onPress;
  //         }}
  //       >
  //         <TextInput
  //           style={flattenStyle}
  //           onChangeText={onChange}
  //           placeholderTextColor={COLORS.neutral300}
  //           onFocus={() => {
  //             setIsFocused(true);
  //           }}
  //           onBlur={e => {
  //             setIsFocused(false);
  //             if (onBlur) {
  //               onBlur(e);
  //             }
  //           }}
  //           {...props}
  //         />
  //         <Pressable
  //           disabled={!editable}
  //           style={styles.iconPressable}
  //           hitSlop={30}
  //           onPress={onIconPress}
  //         >
  //           {Icon && (
  //             <Icon
  //               color={iconColor}
  //               style={iconStyle}
  //               height={16}
  //               width={16}
  //             />
  //           )}
  //         </Pressable>
  //       </Pressable>
  //     );
  //   } else {
  //     return (
  //       <View style={[editable && styles.shadow, styles.wrapper]}>
  //         <TextInput
  //           style={flattenStyle}
  //           onChangeText={onChange}
  //           placeholderTextColor={COLORS.neutral300}
  //           onFocus={() => {
  //             setIsFocused(true);
  //           }}
  //           onBlur={e => {
  //             setIsFocused(false);
  //             if (onBlur) {
  //               onBlur(e);
  //             }
  //           }}
  //           {...props}
  //         />
  //         <Pressable
  //           disabled={!editable}
  //           style={styles.iconPressable}
  //           hitSlop={30}
  //           onPress={onIconPress}
  //         >
  //           {Icon && (
  //             <Icon
  //               color={iconColor}
  //               style={iconStyle}
  //               height={16}
  //               width={16}
  //             />
  //           )}
  //         </Pressable>
  //       </View>
  //     );
  //   }
  // };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {label && <Typography textStyle={labelTextStyle}>{label}</Typography>}
      {!pressable && (
        <View style={[editable && styles.shadow, styles.wrapper]}>
          <TextInput
            style={flattenStyle}
            onChangeText={onChange}
            placeholderTextColor={COLORS.neutral300}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={e => {
              setIsFocused(false);
              if (onBlur) {
                onBlur(e);
              }
            }}
            {...props}
          />
          <Pressable
            disabled={!editable}
            style={styles.iconPressable}
            hitSlop={30}
            onPress={onIconPress}
          >
            {Icon && (
              <Icon
                color={iconColor}
                style={iconStyle}
                height={16}
                width={16}
              />
            )}
          </Pressable>
        </View>
      )}
      {pressable && (
        <Pressable
          style={({pressed}) => [pressed && styles.pressed]}
          onPress={onPress}
        >
          <View pointerEvents="none" style={{flex: 1}}>
            <TextInput
              style={flattenStyle}
              onChangeText={onChange}
              placeholderTextColor={COLORS.neutral300}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={e => {
                setIsFocused(false);
                if (onBlur) {
                  onBlur(e);
                }
              }}
              {...props}
            />
          </View>
          <Pressable
            disabled={!editable}
            style={styles.iconPressable}
            hitSlop={30}
            onPress={onIconPress}
          >
            {Icon && (
              <Icon
                color={iconColor}
                style={iconStyle}
                height={16}
                width={16}
              />
            )}
          </Pressable>
        </Pressable>
      )}
      {/* <View style={[editable && styles.shadow, styles.wrapper]}>
        <TextInput
          style={flattenStyle}
          onChangeText={onChange}
          placeholderTextColor={COLORS.neutral300}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={e => {
            setIsFocused(false);
            if (onBlur) {
              onBlur(e);
            }
          }}
          {...props}
        />
        <Pressable
          disabled={!editable}
          style={styles.iconPressable}
          hitSlop={30}
          onPress={onIconPress}
        >
          {Icon && (
            <Icon color={iconColor} style={iconStyle} height={16} width={16} />
          )}
        </Pressable>
      </View> */}

      <Typography textStyle={styles.errorText}>
        {editable && errorText}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  iconPressable: {
    position: 'absolute',
    top: 13,
    right: 13,
    height: 14,
    width: 14,
    justifyContent: 'center',
  },
  containerStyle: {
    flex: 1,
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
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: COLORS.base000,
  },
  focused: {
    borderColor: COLORS.warning300,
  },
  label: {
    marginVertical: 8,
    color: COLORS.neutral900,
  },
  labelDisabled: {
    color: COLORS.neutral300,
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
  /*eslint-disable react-native/no-unused-styles */
  error: {
    borderColor: COLORS.desctructive600,
  },
  disabled: {
    borderColor: COLORS.neutral300,
  },
  /*eslint-enable react-native/no-unused-styles */
  errorText: {
    height: 20,
    color: COLORS.desctructive500,
    marginTop: 8,
  },
});
