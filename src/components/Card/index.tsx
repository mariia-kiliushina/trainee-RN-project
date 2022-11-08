import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Typography} from '../Typography';
import {ArrowsDownUp, CreditCard, FileCheck, Phone} from 'assets/svg';
import {COLORS} from 'src/constants/colors';

const images = {
  ArrowsDownUp,
  CreditCard,
  FileCheck,
  Phone,
};

export type IconName = keyof typeof images;

type Props = {
  text: string;
  iconName: keyof typeof images;
  style?: StyleProp<ViewStyle>;
};

export const cardMinWidth = 80;
export const cardMarginRight = 5;

export const Card = ({text, iconName, style}: Props) => {
  const Image = iconName ? images[iconName] : undefined;

  let {width, fontScale} = Dimensions.get('window');
  console.log(width);

  let fontSize = 13 / fontScale;
  console.log('fontScale');
  console.log(fontScale);

  return (
    <View style={[styles.wrapper, style]}>
      <Typography
        fontType="bold"
        textStyle={[styles.text, {fontSize: fontSize}]}
      >
        {text}
      </Typography>
      {Image && <Image color={COLORS.neutral900} style={styles.icon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.cardFiller,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginRight: cardMarginRight,
    maxHeight: cardMinWidth,
    padding: 8,
    width: cardMinWidth,
  },

  text: {
    color: COLORS.neutral900,
    lineHeight: 16,
  },
  icon: {
    alignSelf: 'flex-end',
    marginBottom: 0,
    margintTop: 'auto',
  },
});
