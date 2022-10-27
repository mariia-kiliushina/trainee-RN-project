import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Bank} from 'src/assets/svg';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';

export type SelectAccountProps = {
  value: any;
  onPress: (value: any) => void;
};

export const SelectAccount = ({value, onPress}: SelectAccountProps) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
        onPress(value);
      }}
      style={({pressed}) => [pressed && styles.pressed]}
    >
      <View style={styles.wrapper}>
        <Bank height={36} width={36} style={styles.icon} />
        <Typography color={COLORS.neutral900} textStyle={styles.text}>
          {value.name}
        </Typography>
        <Typography textStyle={styles.text} color={COLORS.neutral400}>
          {value.accountNumber}
        </Typography>
      </View>
      <View style={[styles.bottomLine]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 16,
  },
  wrapper: {
    padding: 16,
    paddingLeft: 44,
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: COLORS.neutral200,
  },
  text: {
    marginBottom: 4,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
