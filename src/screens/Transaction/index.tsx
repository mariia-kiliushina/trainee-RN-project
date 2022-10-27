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
import {COLORS} from 'src/constants/colors';
import {HomeTabScreenProps} from 'src/navigation/types';

type InitialValues = {
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
  const keyExtractor = (item: Account) => item.accountNumber;

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
              errorText={String(errors.fromAccount)}
              placeholder="Select beneficiary"
              label="Label"
              onPress={onPress}
              isPressable
              iconName="arrow-down"
              iconColor={COLORS.neutral500}
            />
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
