import {Keyboard, StyleSheet} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {Input} from 'src/components/Input';
import {InputPassword} from 'src/components/InputPassword';
import {RootStackScreenProps} from 'src/navigation/types';
import {loginValidationSchema} from 'src/helpers/validation';
import {useFormik} from 'formik';

type InitialValues = {
  login: string;
  password: string;
};

const initialValues: InitialValues = {
  login: '',
  password: '',
};

export const Login = ({navigation}: RootStackScreenProps<'Login'>) => {
  const {handleChange, handleSubmit, values, errors, handleBlur} = useFormik({
    initialValues,
    onSubmit: valuess => {
      console.log(valuess);
      Keyboard.dismiss();
      navigation.navigate('Main');
    },
    validationSchema: loginValidationSchema,
  });

  return (
    <Container style={styles.main}>
      <Typography fontType="bold" color={COLORS.warning500} variant="24">
        Welcome back
      </Typography>
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
      <Button type="secondary" onPress={handleSubmit}>
        Log in
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.genericWhite,
  },
});
