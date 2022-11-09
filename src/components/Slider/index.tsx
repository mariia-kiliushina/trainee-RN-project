import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {Card, cardMinWidth, cardMarginRight} from 'components/Card';
import {paddingHorizontalExported} from 'src/components/Container';
import {SlideCard} from 'src/screens/Transaction/mock';

type Props = {
  cardsData: SlideCard[];
};

const getMaxHeight = (
  cardWidth: number,
  deviceWidth: number,
  scrollEnabled: boolean,
) => {
  const calculate = () => {
    if (scrollEnabled) {
      return deviceWidth > cardMinWidth ? cardWidth : cardMinWidth;
    } else if (cardWidth > maxNonScalabaleSize) {
      return cardWidth * scaleToRecizeHeigth;
    } else {
      return cardWidth;
    }
  };
  return Math.round(calculate());
};

const scaleToRecizeHeigth = 3 / 4;

export const maxNonScalabaleSize = 120;

export const Slider = ({cardsData}: Props) => {
  const {width: deviceWidth} = Dimensions.get('window');

  const sliderContainerMinWidth =
    cardMinWidth * cardsData.length +
    cardMarginRight * (cardsData.length - 1) +
    paddingHorizontalExported * 2;

  const scrollEnabled = deviceWidth < sliderContainerMinWidth ? true : false;
  const availableWidth = deviceWidth - paddingHorizontalExported * 2;

  const maxWidth: number =
    (availableWidth - cardMarginRight * (cardsData.length - 1)) /
    cardsData.length;

  const maxHeight = getMaxHeight(maxWidth, deviceWidth, scrollEnabled);

  const cards = cardsData.map(({text, iconName}: SlideCard, index) => {
    return (
      <Card
        maxHeight={maxHeight}
        key={iconName}
        text={text}
        iconName={iconName}
        style={[
          index === cardsData.length - 1 ? styles.wrapperLastChild : null,
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
