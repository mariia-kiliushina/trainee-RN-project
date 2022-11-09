import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {Card, IconName} from '../Card';
import {cardMinWidth, cardMarginRight} from 'components/Card';
import {paddingHorizontalExported} from 'src/components/Container';

const cardsMapping: {text: string; iconName: IconName}[] = [
  {text: 'Make Transfers', iconName: 'ArrowsDownUp'},
  {text: 'Airtime & Data', iconName: 'Phone'},
  {text: 'Bill Payments', iconName: 'FileCheck'},
  {text: 'Manage Cards', iconName: 'CreditCard'},
];

type Props = {};

const sliderContainerMinWidth =
  cardMinWidth * cardsMapping.length +
  cardMarginRight * (cardsMapping.length - 1) +
  paddingHorizontalExported * 2;

const scaleToRecizeHeigth = 3 / 4;

export const maxNonScalabaleSize = 120;

export const Slider = ({}: Props) => {
  const {width} = Dimensions.get('window');

  const scrollEnabled = width < sliderContainerMinWidth ? true : false;
  const availableWidth = width - paddingHorizontalExported * 2;

  const maxWidth: number =
    (availableWidth - cardMarginRight * (cardsMapping.length - 1)) /
    cardsMapping.length;

  const getMaxHeight = (cardWidth: number) => {
    const calculate = () => {
      if (scrollEnabled) {
        return width > cardMinWidth ? cardWidth : cardMinWidth;
      } else if (cardWidth > maxNonScalabaleSize) {
        return cardWidth * scaleToRecizeHeigth;
      } else {
        return cardWidth;
      }
    };
    return Math.round(calculate());
  };

  const maxHeight = getMaxHeight(maxWidth);

  const cards = cardsMapping.map(({text, iconName}, index) => {
    return (
      <Card
        maxHeight={maxHeight}
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
      showsHorizontalScrollIndicator={false}
      style={{maxHeight}}
      contentContainerStyle={styles.contentContainer}
    >
      {cards}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexGrow: 1,
  },

  wrapperLastChild: {
    marginRight: 0,
  },
});
