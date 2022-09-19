import React from 'react';
import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Typography} from '../Typography';
import {COLORS} from 'constants/colors';

type Props = {
  // children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const slidesMapping = [
  {
    imageSrc: require('./img/holding-money.png'),
    largeText: 'Gain total control of your money',
    smallText: 'Become your own money manager and make every cent count',
  },
  {
    imageSrc: require('./img/rolled-paper.png'),
    largeText: 'Know where your money goes',
    smallText: `Track your transaction easily, ${'\n'} with categories and financial report `,
  },
  {
    imageSrc: require('./img/plan.png'),
    largeText: 'Planning ahead',
    smallText: 'Setup your budget for each category so you in control',
  },
];

export const Slider = ({style}: Props) => {
  const slides = slidesMapping.map(({imageSrc, largeText, smallText}) => {
    return (
      <View key={imageSrc} style={styles.container}>
        <Image source={imageSrc} />
        <View style={styles.textContainer}>
          <Typography
            fontType="bold"
            textStyle={styles.textLarge}
            style={styles.typographyView}>
            {largeText}
          </Typography>
          <Typography textStyle={styles.textSmall}>{smallText}</Typography>
        </View>
      </View>
    );
  });
  return (
    <View style={style}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        contentContainerStyle={styles.main}>
        {slides}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '300%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '33%',
  },
  textContainer: {
    width: '80%',
    marginTop: 40,
  },
  textLarge: {
    fontSize: 32,
    lineHeight: 39,
    color: COLORS.baseDark50,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 16,
    lineHeight: 19,
    color: COLORS.baseLight20,
    textAlign: 'center',
  },

  typographyView: {
    marginBottom: 16,
  },
});
