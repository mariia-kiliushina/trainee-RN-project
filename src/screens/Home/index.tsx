import {useFormik} from 'formik';
import {
  Button,
  Keyboard,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';

import {SelectProvider} from 'src/components/SelectItems/SelectProvider';
import {COLORS} from 'src/constants/colors';
import {BaseList} from 'src/components/BaseList';
import {Container} from 'src/components/Container';
import {Input} from 'src/components/Input';
import {InputPassword} from 'src/components/InputPassword';
import {Provider, providerData} from './mock';
import {HomeTabScreenProps} from 'src/navigation/types';
import {loginValidationSchema} from 'src/helpers/validation';

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

export const Home = ({navigation}: HomeTabScreenProps<'Home'>) => {
  const {
    setFieldValue,
    handleChange,
    handleSubmit,
    values,
    errors,
    handleBlur,
  } = useFormik({
    initialValues,
    onSubmit: _ => {
      Keyboard.dismiss();
    },
    validationSchema: loginValidationSchema,
  });

  const keyExtractor = (item: Provider) => item.provider;

  const renderItem: ListRenderItem<Provider> = ({
    item,
  }: ListRenderItemInfo<Provider>) => (
    <SelectProvider
      value={item}
      onPress={provider => {
        setFieldValue('provider', provider);
      }}
    />
  );

  const onInputPress = () => {
    navigation.navigate('BottomSheetModal', {
      children: (
        <BaseList
          options={providerData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      ),
    });
  };
  return (
    <Container style={styles.main}>
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

      <Input
        value={values.provider?.provider}
        errorText={errors.provider?.provider}
        placeholder="Select provider"
        label="Provider"
        onPress={onInputPress}
        isPressable
        iconName="arrow-down"
        iconColor={COLORS.neutral500}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.base000,
  },
});
