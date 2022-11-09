import {StyleProp, StyleSheet, Pressable, ViewStyle} from 'react-native';
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
  style?: StyleProp<ViewStyle>;
  maxHeight: number;
};

export const cardMinWidth = 80;
export const cardMarginRight = 5;

const iconGrowScale = 0.4;

const getFontSize = (maxHeight: number) => {
  if (maxHeight > maxNonScalabaleSize) {
    return 16;
  } else if (maxHeight > cardMinWidth) {
    return 13;
  } else {
    return 11;
  }
};

const getPadding = (maxHeight: number) => {
  const calculate = () => {
    if (maxHeight > cardMinWidth * 1.5) {
      return maxHeight * 0.15;
    } else if (maxHeight > cardMinWidth * 1.2) {
      return maxHeight * 0.12;
    } else {
      return maxHeight * 0.1;
    }
  };
  return Math.round(calculate());
};

export const Card = ({text, iconName, style, maxHeight}: Props) => {
  const Image = iconName ? images[iconName] : undefined;

  const fontSize = getFontSize(maxHeight);
  const padding = getPadding(maxHeight);

  let iconSizeRelativeToCardContentSize = maxHeight * iconGrowScale;

  return (
    <Pressable
      style={({pressed}) => [
        styles.wrapper,
        {height: maxHeight, padding},
        style,
        pressed && styles.pressed,
      ]}
    >
      <Typography
        fontType="bold"
        textStyle={[styles.text, {fontSize: fontSize}]}
      >
        {text}
      </Typography>
      {Image && (
        <Image
          color={COLORS.neutral900}
          style={styles.icon}
          width={iconSizeRelativeToCardContentSize}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    width: cardMinWidth,
    backgroundColor: COLORS.cardFiller,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginRight: cardMarginRight,
  },

  text: {
    color: COLORS.neutral900,
    lineHeight: 16,
  },
  icon: {
    alignSelf: 'flex-end',
    marginBottom: 0,
    margintTop: 'auto',
    flexGrow: iconGrowScale,
  },
  pressed: {
    opacity: 0.7,
  },
});
