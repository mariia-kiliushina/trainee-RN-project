import {useFormik} from 'formik';
import {Keyboard} from 'react-native';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {Input} from 'src/components/Input';
import {InputPassword} from 'src/components/InputPassword';
import {registeringValidationSchema} from 'src/helpers/validation';
import {Provider} from './mock';
import {RootStackScreenProps} from 'src/navigation/types';

type InitialValues = {
  login: string;
  password: string;
  confirmPassword: string;
  provider: Provider;
};

const initialValues: InitialValues = {
  login: '',
  password: '',
  confirmPassword: '',
  provider: {amount: 0, currency: '', provider: ''},
};

export const ChangePassword = ({
  navigation,
}: RootStackScreenProps<'ChangePassword'>) => {
  const {handleChange, handleSubmit, values, errors, handleBlur} = useFormik({
    initialValues,
    validationSchema: registeringValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      Keyboard.dismiss();
      navigation.goBack();
    },
  });

  return (
    <Container>
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
      <Button onPress={handleSubmit} type="primary">
        Submit
      </Button>
    </Container>
  );
};
