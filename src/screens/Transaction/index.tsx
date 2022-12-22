import {
  Keyboard,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {HomeTabScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {SelectAccount} from 'src/components/SelectItems/SelectAccount';
import {Input} from 'src/components/Input';
import {BaseList} from 'src/components/BaseList';
import {Button} from 'src/components/Button';
import {Timer} from 'src/components/Timer';
import {SelectProvider} from 'src/components/SelectItems/SelectProvider';
import {COLORS} from 'src/constants/colors';
import {ownAccountData, Provider, providerData} from './mock';
import {Account} from './types';

export type InitialValues = {
  fromAccount: Account;
  provider: Provider;
};

const OTPConfirmation = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <Input placeholder="Enter your OTP code" />
      <Button type="primary" onPress={navigation.goBack}>
        Submit
      </Button>
      <Timer time={5} />
    </View>
  );
};

const initialValues: InitialValues = {
  fromAccount: {
    name: '',
    accountNumber: '',
  },
  provider: {
    provider: '',
    currency: '',
    amount: 0,
  },
};

export const Transaction = ({
  navigation,
}: HomeTabScreenProps<'Transaction'>) => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      Keyboard.dismiss();
      navigation.navigate('BottomSheetModal', {
        children: <OTPConfirmation />,
      });
    },
  });

  const keyLabelExtractor = (item: Account) => item.accountNumber;

  const renderLabelItem: ListRenderItem<Account> = ({
    item,
  }: ListRenderItemInfo<Account>) => (
    <SelectAccount
      value={item}
      onPress={account => {
        formik.setFieldValue('fromAccount', account);
      }}
    />
  );

  const keyProviderExtractor = (item: Provider) => item.provider;

  const renderProviderItem: ListRenderItem<Provider> = ({
    item,
  }: ListRenderItemInfo<Provider>) => (
    <SelectProvider
      value={item}
      onPress={provider => {
        formik.setFieldValue('provider', provider);
      }}
    />
  );

  const onLabelInputPress = () => {
    navigation.navigate('BottomSheetModal', {
      children: (
        <BaseList
          options={ownAccountData}
          renderItem={renderLabelItem}
          keyExtractor={keyLabelExtractor}
        />
      ),
    });
  };

  const onProviderInputPress = () => {
    navigation.navigate('BottomSheetModal', {
      children: (
        <BaseList
          options={providerData}
          renderItem={renderProviderItem}
          keyExtractor={keyProviderExtractor}
        />
      ),
    });
  };
  return (
    <Container>
      <Input
        value={formik.values.fromAccount?.accountNumber}
        errorText={formik.errors.fromAccount?.accountNumber}
        placeholder="Select beneficiary"
        label="Label"
        onPress={onLabelInputPress}
        isPressable
        iconName="arrow-down"
        iconColor={COLORS.neutral500}
      />
      <Input
        value={formik.values.provider?.provider}
        errorText={formik.errors.provider?.provider}
        placeholder="Select provider"
        label="Provider"
        onPress={onProviderInputPress}
        isPressable
        iconName="arrow-down"
        iconColor={COLORS.neutral500}
      />
      <Button onPress={formik.handleSubmit} type="primary">
        Confirm payment
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
});
