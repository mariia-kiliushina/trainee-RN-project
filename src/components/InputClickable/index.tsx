import React from 'react';
import {ListRenderItem, Pressable, StyleSheet, View} from 'react-native';
import {Input, InputProps} from 'components/Input';
import {useNavigation} from '@react-navigation/native';
import {BaseList} from 'components/BaseList';
import {RootStackParamList} from 'src/navigation/stack';
import type {StackNavigationProp} from '@react-navigation/stack';
import {ArrowDown} from 'assets/svg/index';

type ClickableInputProps<Option> = InputProps & {
  options: Option[];
  renderItem: ListRenderItem<Option>;
};

export type BottomModalScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

export function InputClickable<Option>({
  label,
  options,
  renderItem,
  ...props
}: ClickableInputProps<Option>) {
  const navigation = useNavigation<BottomModalScreenNavigationProp>();

  const onPress = () => {
    navigation.navigate('BottomSheetModal', {
      children: <BaseList options={options} renderItem={renderItem} />,
    });
  };

  return (
    <Pressable
      style={({pressed}) => [pressed && styles.pressed]}
      onPress={onPress}
    >
      <View pointerEvents="none" style={styles.main}>
        <Input label={label} {...props} />
        <ArrowDown style={styles.arrowButon} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  arrowButon: {
    position: 'absolute',
    top: 47,
    right: 12,
    height: 20,
    width: 20,
  },
});
