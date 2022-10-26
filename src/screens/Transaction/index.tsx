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
import {InputClickable} from 'src/components/InputClickable';
import {SelectItem} from 'src/components/SelectItem';
import {ownAccountData, Account} from './mock';

type InitialValues = {
  fromAccount?: Account;
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
            <InputClickable
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
