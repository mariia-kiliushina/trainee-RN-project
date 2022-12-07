import {useFormik} from 'formik';
import {Keyboard, ListRenderItem, ListRenderItemInfo} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {COLORS} from 'src/constants/colors';
import {STORAGE} from 'src/constants/storage';
import {SelectProvider} from 'src/components/SelectItems/SelectProvider';
import {BaseList} from 'src/components/BaseList';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {Input} from 'src/components/Input';
import {InputPassword} from 'src/components/InputPassword';
import {HomeTabScreenProps} from 'src/navigation/types';
import {registeringValidationSchema} from 'src/helpers/validation';
import {useAppDispatch} from 'src/hooks/redux';
import {logOutUser} from 'src/store/profileSlice/slice';
import {Provider, providerData} from './mock';

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
  const dispatch = useAppDispatch();

  const {
    setFieldValue,
    handleChange,
    handleSubmit,
    values,
    errors,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: registeringValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      Keyboard.dismiss();
    },
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

  const logUserOut = () => {
    dispatch(logOutUser());
  };

  const cleanStorage = () => {
    removeItem(STORAGE.loginStorage);
  };

  async function removeItem(itemName: string) {
    try {
      await EncryptedStorage.removeItem(itemName);
    } catch (error) {
      console.log(error);
    }
  }

  const onNavigate = () => {
    navigation.navigate('Video');
  };
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
      <Button type="primary" onPress={onNavigate}>
        Create biometry snapshot
      </Button>
      <Button type="secondary" onPress={cleanStorage}>
        Clean storage
      </Button>
      <Button type="secondary" onPress={logUserOut}>
        Log out
      </Button>
    </Container>
  );
};
