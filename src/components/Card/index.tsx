import {StyleProp, StyleSheet, Pressable, ViewStyle, View} from 'react-native';
import {Typography} from '../Typography';
import {ArrowsDownUp, CreditCard, FileCheck, Phone} from 'assets/svg';
import {COLORS} from 'src/constants/colors';
import {maxNonScalabaleSize} from 'components/Slider';

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
  // style?: StyleProp<ViewStyle>;
  // maxHeight: number;
};

export const cardMinWidth = 80;
export const cardMarginRight = 5;

export const Card = ({text, iconName}: Props) => {
  const Image = iconName ? images[iconName] : undefined;

  // const fontSize = getFontSize(maxHeight);
  // const padding = getPadding(maxHeight);

  // let iconSizeRelativeToCardContentSize = maxHeight * iconGrowScale;

  return (
    <View
      style={[
        styles.wrapper,
        // {height: maxHeight, padding},
        // style,
        // pressed && styles.pressed,
      ]}
    >
      <Typography fontType="bold" textStyle={[styles.text]}>
        {text}
      </Typography>
      {Image && <Image color={COLORS.neutral900} style={styles.icon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minWidth: 95,
    aspectRatio: 1,
    padding: 10,
    backgroundColor: COLORS.cardFiller,
    borderRadius: 10,
    marginRight: cardMarginRight,
  },

  text: {
    color: COLORS.neutral900,
  },
  icon: {
    alignSelf: 'flex-end',
  },
});
