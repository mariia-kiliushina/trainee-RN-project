import React from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {Slide} from 'components/Slide';
import {ImageSourcePropType} from 'react-native';

type TSlide = {
  id: number;
  imageSrc: ImageSourcePropType;
  largeText: string;
  smallText: string;
};
type Props = {
  style?: StyleProp<ViewStyle>;
};

const slidesMapping: TSlide[] = [
  {
    id: 1,
    imageSrc: require('assets/img/holding-money.png'),
    largeText: 'Gain total control of your money',
    smallText: 'Become your own money manager and make every cent count',
  },
  {
    id: 2,
    imageSrc: require('assets/img/rolled-paper.png'),
    largeText: 'Know where your money goes',
    smallText: `Track your transaction easily, ${'\n'} with categories and financial report `,
  },
  {
    id: 3,
    imageSrc: require('assets/img/plan.png'),
    largeText: 'Planning ahead',
    smallText: 'Setup your budget for each category so you in control',
  },
];

export const Slider = ({}: Props) => {
  const slides = slidesMapping.map(({imageSrc, largeText, smallText}) => {
    return (
      <Slide
        key={largeText}
        imageSrc={imageSrc}
        largeText={largeText}
        smallText={smallText}
      />
    );
  });
  return (
    <ScrollView horizontal={true} pagingEnabled={true}>
      {slides}
    </ScrollView>
  );
};
