import React from 'react';
import {useWindowDimensions} from 'react-native';
import {
  Image,
  View,
  StyleProp,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import {Typography} from '../Typography';
import {COLORS} from 'constants/colors';

type Props = {
  imageSrc: ImageSourcePropType;
  smallText: string;
  largeText: string;
  style?: StyleProp<ViewStyle>;
};

export const Slide = ({imageSrc, largeText, smallText}: Props) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image source={imageSrc} style={styles.imageStyle} />
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
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    aspectRatio: 1,
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
