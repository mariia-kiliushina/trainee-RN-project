import {useFormik} from 'formik';
import {
  Keyboard,
  ListRenderItem,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Container} from 'src/components/Container';
import {SelectAccount} from 'src/components/SelectItems/SelectAccount';
import {Card} from 'components/Card';
import {Input} from 'src/components/Input';
import {BaseList} from 'src/components/BaseList';
import {Button} from 'src/components/Button';
import {COLORS} from 'src/constants/colors';
import {HomeTabScreenProps} from 'src/navigation/types';
import {Account} from './types';
import {ownAccountData, cardsData, Provider, providerData} from './mock';
import {SelectProvider} from 'src/components/SelectItems/SelectProvider';

export type InitialValues = {
  fromAccount: Account;
  provider: Provider;
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
    <Container contentLayout={styles.contentLayout}>
      <View style={styles.contentWrapper}>
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
          Proceed
        </Button>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContainer}
        >
          {cardsData.map((card, index) => {
            return (
              <Card
                key={card.iconName}
                text={card.text}
                iconName={card.iconName}
                isLast={cardsData.length - 1 === index}
              />
            );
          })}
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  contentLayout: {
    paddingHorizontal: 0,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
});
