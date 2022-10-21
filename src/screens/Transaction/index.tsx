import React from 'react';
import {Formik} from 'formik';
import {Button, Keyboard, StyleSheet, View} from 'react-native';
import {Container} from 'src/components/Container';
import {InputClickable} from 'src/components/InputClickable';
import {COLORS} from 'src/constants/colors';
import {Typography} from 'src/components/Typography';
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
              onChangeText={handleChange('fromAccount')}
              onBlur={handleBlur('fromAccount')}
              value={values.fromAccount}
              errorText={errors.fromAccount}
              placeholder="Select sender"
              placeholderTextColor={COLORS.base000}
              inputStyle={styles.inputStyle}
            >
              <Typography style={styles.text} color={COLORS.neutral100}>
                From
              </Typography>
              <Typography style={styles.account} color={COLORS.neutral100}>
                Account
              </Typography>
            </InputClickable>
            <InputClickable
              onPress={onPress}
              onChangeText={handleChange('toAccount')}
              onBlur={handleBlur('toAccount')}
              value={values.toAccount}
              errorText={errors.toAccount}
              placeholder="Select beneficiary"
              placeholderTextColor={COLORS.base000}
              inputStyle={styles.inputStyle}
              shadow={true}
            >
              <Typography style={styles.text} color={COLORS.neutral100}>
                To
              </Typography>
              <Typography style={styles.account} color={COLORS.neutral100}>
                Account
              </Typography>
            </InputClickable>
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
    paddingTop: 22,
    paddingLeft: 90,
    borderWidth: 2,
    borderColor: 'red',
  },
  text: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  account: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
});
