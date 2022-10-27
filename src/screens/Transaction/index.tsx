import React from 'react';
import {useFormik} from 'formik';
import {
  Button,
  Keyboard,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {Container} from 'src/components/Container';
import {SelectItem} from 'src/components/SelectItem';
import {ownAccountData, Account} from './mock';
import {Input} from 'src/components/Input';
import {BaseList} from 'src/components/BaseList';
import {COLORS} from 'src/constants/colors';
import {HomeTabScreenProps} from 'src/navigation/types';

export type InitialValues = {
  fromAccount: Account;
};

const initialValues: InitialValues = {
  fromAccount: {
    name: '',
    accountNumber: '',
  },
};

export type BaseListProps<Option> = {
  options: Option[];
  renderItem: ListRenderItem<Option>;
};

export const Transaction = ({
  navigation,
}: HomeTabScreenProps<'Transaction'>) => {
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      console.log(JSON.stringify(values));
      Keyboard.dismiss();
    },
  });

  const keyExtractor = (item: Account) => item.accountNumber;

  const renderItem: ListRenderItem<Account> = ({
    item,
  }: ListRenderItemInfo<Account>) => (
    <SelectItem
      fieldName={item.name}
      iconName="bank"
      name={item.name}
      accountNumber={item.accountNumber}
      onPress={formik.setFieldValue}
    />
  );

  const onPress = () => {
    navigation.navigate('BottomSheetModal', {
      children: (
        <BaseList
          options={ownAccountData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      ),
    });
  };

  return (
    <Container style={styles.flex}>
      <View>
        <Input
          onChangeText={formik.handleChange('fromAccount')}
          onBlur={formik.handleBlur('fromAccount')}
          value={formik.values.fromAccount?.accountNumber || ''}
          errorText={formik.errors.fromAccount?.accountNumber}
          placeholder="Select beneficiary"
          label="Label"
          onPress={onPress}
          isPressable
          iconName="arrow-down"
          iconColor={COLORS.neutral500}
        />
        <Button onPress={formik.handleSubmit} title="Proceed" />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
