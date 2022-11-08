import {useEffect, useState} from 'react';
import {Keyboard, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useAppDispatch} from 'src/hooks';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {Input} from 'src/components/Input';
import {STORAGE} from 'src/constants/storage';
import {InputPassword} from 'src/components/InputPassword';
import {loginValidationSchema} from 'src/helpers/validation';
import {logInUser} from 'src/store/profileSlice/slice';
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

type InitialValues = {
  login: string;
  password: string;
};

type StoreValues = {
  login: string;
  password: string;
};

const initialValues: InitialValues = {
  login: '',
  password: '',
};

export const Login = () => {
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(false);

  const dispatch = useAppDispatch();

  const submitHandler = (formValues: InitialValues) => {
    Keyboard.dismiss();

    dispatch(logInUser());

    storeItem(STORAGE.loginStorage, {
      login: formValues.login,
      password: formValues.password,
    });
  };

  const {handleChange, handleSubmit, values, errors, handleBlur, setValues} =
    useFormik({
      initialValues,
      validationSchema: loginValidationSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: submitHandler,
    });

  const storeItem = async (itemName: string, data: StoreValues) => {
    try {
      return await EncryptedStorage.setItem(itemName, JSON.stringify(data));
    } catch (error) {
      return console.log(error);
    }
  };

  const retrieveItem = (itemName: string) => {
    const response = EncryptedStorage.getItem(itemName)
      .then(storedData => {
        if (storedData) {
          return JSON.parse(storedData);
        } else {
          return storedData;
        }
      })
      .catch(error => console.log(error));

    return response;
  };

  const onBiometricsSelection = async () => {
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();

    if (available) {
      let {success} = await rnBiometrics.simplePrompt({
        promptMessage: `Sign in with ${biometryType}`,
        cancelButtonText: 'Close',
      });
      if (success) {
        dispatch(logInUser());
      }
    }
  };

  useEffect(() => {
    retrieveItem(STORAGE.loginStorage).then(credentials => {
      if (credentials) {
        setValues(formValues => ({...formValues, login: credentials.login}));
        rnBiometrics
          .isSensorAvailable()
          .then(({available}) => setIsBiometricsAvailable(available));
      }
    });
  }, [setValues]);

  return (
    <Container contentLayout={styles.contentLayout}>
      <Typography fontType="bold" color={COLORS.warning500} variant="24">
        Welcome back
      </Typography>
      <Input
        textContentType="username"
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
      <Button type="secondary" onPress={handleSubmit}>
        Log in
      </Button>
      {isBiometricsAvailable && (
        <Button type="primary" onPress={onBiometricsSelection}>
          Use biometrics
        </Button>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  contentLayout: {
    justifyContent: 'center',
  },
});

