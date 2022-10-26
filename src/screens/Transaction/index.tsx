import React from 'react';
import {Formik} from 'formik';
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
import {RootStackParamList} from 'src/navigation/stack';
import type {StackNavigationProp} from '@react-navigation/stack';
import {COLORS} from 'src/constants/colors';
import {useNavigation} from '@react-navigation/native';

type InitialValues = {
  fromAccount?: Account;
};

export type BottomModalScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

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

export const Transaction = () => {
  const renderItem: ListRenderItem<Account> = ({
    item,
  }: ListRenderItemInfo<Account>) => (
    <SelectItem
      fieldName={item.name}
      iconName="bank"
      name={item.name}
      accountNumber={item.accountNumber}
    />
  );

  const navigation = useNavigation<BottomModalScreenNavigationProp>();

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

  const keyExtractor = (item: Account) => item.accountNumber;
  return (
    <Container style={styles.main}>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => {
          console.log(values);
          Keyboard.dismiss();
        }}
      >
        {({handleChange, handleSubmit, values, errors, handleBlur}) => (
          <View>
            <Input
              onChangeText={handleChange('toAccount')}
              onBlur={handleBlur('toAccount')}
              value={
                values.fromAccount ? values.fromAccount?.accountNumber : ''
              }
              errorText={errors.fromAccount}
              placeholder="Select beneficiary"
              label="Label"
              onPress={onPress}
              onIconPress={onPress}
              pressable={true}
              iconName="arrow-down"
              iconColor={COLORS.neutral500}
            />
            {/* <InputClickable
              onChangeText={handleChange('toAccount')}
              onBlur={handleBlur('toAccount')}
              value={
                values.fromAccount ? values.fromAccount?.accountNumber : ''
              }
              errorText={errors.fromAccount}
              placeholder="Select beneficiary"
              label="Label"
              options={ownAccountData}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            /> */}
            <Button onPress={handleSubmit} title="Proceed" />
          </View>
        )}
      </Formik>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
