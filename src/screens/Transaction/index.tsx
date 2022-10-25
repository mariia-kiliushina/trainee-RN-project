import React from 'react';
import {Formik} from 'formik';
import {Button, Keyboard, StyleSheet, View} from 'react-native';
import {Container} from 'src/components/Container';
import {InputClickable} from 'src/components/InputClickable';
import {COLORS} from 'src/constants/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/stack';

type InitialValues = {
  fromAccount: string;
  toAccount: string;
  amount: string;
};

const initialValues: InitialValues = {
  fromAccount: '',
  toAccount: '',
  amount: '',
};

export const Transaction = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const onPress = () => {
    navigation.navigate('BottomSheetModal');
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
            <InputClickable
              onPress={onPress}
              onChangeText={handleChange('toAccount')}
              onBlur={handleBlur('toAccount')}
              value={values.toAccount}
              errorText={errors.toAccount}
              placeholder="Select beneficiary"
              placeholderTextColor={COLORS.neutral400}
              inputStyle={styles.inputStyle}
              shadow={true}
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
  inputStyle: {
    color: COLORS.neutral400,
  },
});
