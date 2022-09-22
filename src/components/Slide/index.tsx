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
      <View style={styles.imageContainer}>
        <Image source={imageSrc} style={styles.image} />
      </View>
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
    justifyContent: 'space-between',
  },
  image: {
    aspectRatio: 1,
    borderColor: 'red',
    borderWidth: 1,
    width: '80%',
  },
  imageContainer: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: '10%',
  },

  textContainer: {
    width: '80%',
    marginTop: 40,
    borderColor: 'blue',
    borderWidth: 1,
    justifyContent: 'center',
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
