import EncryptedStorage from 'react-native-encrypted-storage';
import {Keyboard, StyleSheet} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {Input} from 'src/components/Input';
import {InputPassword} from 'src/components/InputPassword';
import {loginValidationSchema} from 'src/helpers/validation';
import {useFormik} from 'formik';
import {useAppDispatch} from 'src/hooks';
import {logInUser} from 'src/store/profileSlice/slice';
import {useEffect, useState} from 'react';

type InitialValues = {
  login: string;
  password: string;
};

const initialValues: InitialValues = {
  login: '',
  password: '',
};

export const Login = () => {
  const dispatch = useAppDispatch();

  const [userLogin, setUserLogin] = useState('');

  const {handleChange, handleSubmit, values, errors, handleBlur, setValues} =
    useFormik({
      initialValues,
      validationSchema: loginValidationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: values => {
        logUserIn();
        storeItem(
          {login: values.login, password: values.password},
          'sessionData',
        );
        Keyboard.dismiss();
      },
    });

  useEffect(() => {
    const response = async () => {
      let res = await retrieveItem('sessionData');
      setValues(formValues => ({
        ...formValues,
        login: userLogin,
      }));
      return res ? res.login : res;
    };
    response().then(res => setUserLogin(res));
  }, [userLogin, setValues]);

  const logUserIn = () => {
    dispatch(logInUser());
  };

  async function storeItem(
    data: string | Record<string, any>,
    itemName: string,
  ) {
    try {
      await EncryptedStorage.setItem(itemName, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  async function retrieveItem(itemName: string) {
    try {
      let response = await EncryptedStorage.getItem(itemName).then(
        storageResponse => {
          return storageResponse;
        },
      );
      let parsed = response ? JSON.parse(response) : response;
      return parsed;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container style={styles.main} backgroundStyle={styles.background}>
      <Typography fontType="bold" color={COLORS.warning500} variant="24">
        Welcome back
      </Typography>
      <Input
        textContentType="username"
        label="Login"
        placeholder="Login"
        onChangeText={handleChange('login')}
        onBlur={handleBlur('login')}
        value={values.login ? values.login : userLogin}
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
      <Button type="secondary" onPress={handleSubmit}>
        Log in
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
  },
  background: {
    backgroundColor: COLORS.genericWhite,
  },
});
