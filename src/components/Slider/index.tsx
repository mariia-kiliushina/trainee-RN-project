import {ScrollView, StyleSheet} from 'react-native';
import {Card, cardMinWidth, cardMarginRight} from 'components/Card';
import {paddingHorizontalExported} from 'src/components/Container';
import {SlideCard} from 'src/screens/Transaction/mock';
import {useWindowDimensions} from 'react-native';

type Props = {
  cardsData: SlideCard[];
};

export const maxNonScalabaleSize = 120;

export const Slider = ({cardsData}: Props) => {
  const {width: deviceWidth} = useWindowDimensions();

  const sliderContainerMinWidth =
    cardMinWidth * cardsData.length +
    cardMarginRight * (cardsData.length - 1) +
    paddingHorizontalExported * 2;

  const scrollEnabled = deviceWidth < sliderContainerMinWidth ? true : false;

  const cards = cardsData.map(({text, iconName}: SlideCard, index) => {
    return (
      <Card
        key={iconName}
        text={text}
        iconName={iconName}
        isLast={cardsData.length - 1 === index}
      />
    );
  });

  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {cards}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'space-around',
    flexGrow: 1,
  },
});
