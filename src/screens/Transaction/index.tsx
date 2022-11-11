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
import {Card, cardMarginRight} from 'components/Card';
import {Input} from 'src/components/Input';
import {BaseList} from 'src/components/BaseList';
import {Button} from 'src/components/Button';
import {COLORS} from 'src/constants/colors';
import {HomeTabScreenProps} from 'src/navigation/types';
import {ownAccountData, Account, cardsData} from './mock';

export type InitialValues = {
  fromAccount: Account;
};

const initialValues: InitialValues = {
  fromAccount: {
    name: '',
    accountNumber: '',
  },
};

const maxCardSize = 90;
const paddingHorizontal = 2;
const numOfCards = cardsData.length;
const requiredSliderWidth =
  maxCardSize * numOfCards +
  paddingHorizontal * 2 +
  cardMarginRight * (numOfCards - 1); //last child doesn't have margin

export const Transaction = ({
  navigation,
}: HomeTabScreenProps<'Transaction'>) => {
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      Keyboard.dismiss();
    },
  });

  const keyExtractor = (item: Account) => item.accountNumber;

  const renderItem: ListRenderItem<Account> = ({
    item,
  }: ListRenderItemInfo<Account>) => (
    <SelectAccount
      value={item}
      onPress={account => {
        formik.setFieldValue('fromAccount', account);
      }}
    />
  );

  const onInputPress = () => {
    navigation.navigate('BottomSheetModal', {
      children: (
        <BaseList
          options={ownAccountData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
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
          onPress={onInputPress}
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
          contentContainerStyle={[
            {
              width: requiredSliderWidth,
            },
            styles.sliderContainer,
          ]}
        >
          {cardsData.map((card, index) => {
            return (
              <Card
                key={card.iconName}
                text={card.text}
                iconName={card.iconName}
                isLast={cardsData.length - 1 === index}
                maxSize={maxCardSize}
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
    justifyContent: 'space-evenly',
    paddingHorizontal: paddingHorizontal,
  },
  contentLayout: {
    paddingHorizontal: 0,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
});
