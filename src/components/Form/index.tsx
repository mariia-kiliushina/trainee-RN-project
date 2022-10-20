import React from 'react';
import {Formik} from 'formik';
import {Button, Keyboard, StyleSheet, View} from 'react-native';
import {Input} from 'components/Input';
import {InputPassword} from 'components/InputPassword';
type Props = {};

const PASSWORD = 'Password';
const LOGIN = 'Login';

type InitialValues = {
  login: string;
  password: string;
  passwordDisabled: string;
};

export const Form = ({}: Props) => {
  const validate = (values: any) => {
    const errors = {login: '', password: '', passwordDisabled: ''};

    if (!values.login) {
      errors.login = 'Required';
    }
    if (values.login.trim().length < 5) {
      errors.login = 'Login cannot be less than 5 chars';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (values.password.trim().length < 5) {
      errors.password = 'Password cannot be less than 5 chars';
    }

    return errors;
  };

  const initialValues: InitialValues = {
    login: '',
    password: '',
    passwordDisabled: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={true}
      validate={validate}
      onSubmit={values => {
        console.log(values);
        Keyboard.dismiss();
      }}>
      {({handleChange, handleSubmit, values, handleBlur, touched, errors}) => (
        <View style={styles.main}>
          <Input
            label={LOGIN}
            placeholder="Login"
            onChangeText={handleChange('login')}
            onBlur={handleBlur('login')}
            value={values.login}
            errorText={touched.login && errors.login}
          />
          <InputPassword
            label={PASSWORD}
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            errorText={touched.password && errors.password}
          />
          <InputPassword
            label={PASSWORD}
            placeholder="passwordDisabled"
            onChangeText={handleChange('passwordDisabled')}
            onBlur={handleBlur('passwordDisabled')}
            value={values.passwordDisabled}
            errorText={touched.passwordDisabled && errors.passwordDisabled}
            disabled
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  main: {},
});
