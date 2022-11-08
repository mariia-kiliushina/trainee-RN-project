import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {Card, IconName} from '../Card';
import {cardMinWidth, cardMarginRight} from 'components/Card';
import {paddingHorizontalExported} from 'components/Container';

const cardsMapping: {text: string; iconName: IconName}[] = [
  {text: 'Make Transfers', iconName: 'ArrowsDownUp'},
  {text: 'Airtime & Data', iconName: 'Phone'},
  {text: 'Bill Payments', iconName: 'FileCheck'},
  {text: 'Manage Cards', iconName: 'CreditCard'},
];

type Props = {};

export const Cards = ({}: Props) => {
  let {width} = Dimensions.get('window');

  const sliderContainerMinWidth =
    cardMinWidth * 4 + cardMarginRight * 3 + paddingHorizontalExported * 2;

  const scrollEnabled = width < sliderContainerMinWidth ? true : false;

  console.log('scrollEnabled');
  console.log(scrollEnabled);

  const cards = cardsMapping.map(({text, iconName}, index) => {
    return (
      <Card
        key={iconName}
        text={text}
        iconName={iconName}
        style={[
          index === cardsMapping.length - 1 ? styles.wrapperLastChild : null,
        ]}
      />
    );
  });

  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      horizontal={true}
      contentContainerStyle={styles.wrapper}
    >
      {cards}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxHeight: cardMinWidth,
    flexGrow: 1,
  },
  wrapperLastChild: {
    marginRight: 0,
  },
});
