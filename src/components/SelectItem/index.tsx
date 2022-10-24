import {useFormikContext} from 'formik';
import React from 'react';

import {Pressable, StyleSheet, View} from 'react-native';
import {Bank, IconsType, User} from 'src/assets/svg';
import {COLORS} from 'src/constants/colors';
import {InitialValues} from 'src/screens/Transaction';
import {Typography} from '../Typography';

export type SelectItemProps = {
  fieldName: string;
  iconName: 'user' | 'bank';
  name: string;
  accountNumber: string;
};

export const SelectItem = ({
  fieldName,
  iconName,
  name,
  accountNumber,
}: SelectItemProps) => {
  const icons: IconsType = {
    user: User,
    bank: Bank,
  };

  // let setFieldValue = (fieldname: string, accountnumber: string) => {
  //   `${fieldname} was changed to ${accountnumber}`;
  // };

  const {setFieldValue} = useFormikContext<InitialValues>();

  const onPress = () => {
    setFieldValue(fieldName, accountNumber);
  };
  const Icon = iconName ? icons[iconName] : null;
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [pressed && styles.pressed]}
    >
      <View style={styles.wrapper}>
        {Icon && <Icon height={36} width={36} style={styles.icon} />}
        <Typography color={COLORS.neutral900} textStyle={styles.text}>
          {name}
        </Typography>
        <Typography textStyle={styles.text} color={COLORS.neutral400}>
          {accountNumber}
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
