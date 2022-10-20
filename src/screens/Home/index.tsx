import {Formik} from 'formik';
import React from 'react';
import {Button, Keyboard, StyleSheet, View} from 'react-native';

import {Container} from 'src/components/Container';
import {Input} from 'src/components/Input';
import {InputPassword} from 'src/components/InputPassword';

import {COLORS} from 'src/constants/colors';

import {passwordValidationSchema} from 'src/helpers/validation';

const PASSWORD = 'Password';
const LOGIN = 'Login';

type InitialValues = {
  login: string;
  password: string;
};

const initialValues: InitialValues = {
  login: '',
  password: '',
};

export const Home = () => {
  return (
    <Container style={styles.main}>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={true}
        validationSchema={passwordValidationSchema}
        onSubmit={values => {
          console.log(values);
          Keyboard.dismiss();
        }}>
        {({handleChange, handleSubmit, values, errors, handleBlur}) => (
          <View style={styles.main}>
            <Input
              label={LOGIN}
              placeholder="Login"
              onChangeText={handleChange('login')}
              onBlur={handleBlur('login')}
              value={values.login}
              editable={true}
              errorText={errors.login}
            />
            <InputPassword
              label={PASSWORD}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              editable={true}
              errorText={errors.password}
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
