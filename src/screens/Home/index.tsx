import {Formik} from 'formik';
import React from 'react';
import {Button, Keyboard, StyleSheet, View} from 'react-native';

import {Container} from 'src/components/Container';
import {Input} from 'src/components/Input';
import {InputPassword} from 'src/components/InputPassword';

import {COLORS} from 'src/constants/colors';

import {loginValidationSchema} from 'src/helpers/validation';

type InitialValues = {
  login: string;
  password: string;
  confirmPassword: string;
};

const initialValues: InitialValues = {
  login: '',
  password: '',
  confirmPassword: '',
};

export const Home = () => {
  return (
    <Container style={styles.main}>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={loginValidationSchema}
        onSubmit={values => {
          console.log(values);
          Keyboard.dismiss();
        }}
      >
        {({handleChange, handleSubmit, values, errors, handleBlur}) => (
          <View style={styles.main}>
            <Input
              label="Login"
              placeholder="Login"
              onChangeText={handleChange('login')}
              onBlur={handleBlur('login')}
              value={values.login}
              errorText={errors.login}
            />
            <InputPassword
              label="Password"
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              errorText={errors.password}
            />

            <InputPassword
              label="Password Confirm"
              placeholder="Password Confirm"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              errorText={errors.confirmPassword}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.base000,
  },
});
