import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Pressable,
  ViewStyle,
} from 'react-native';
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
  const {width} = Dimensions.get('window');

  const Image = iconName ? images[iconName] : undefined;

  const getFontSize = (screenWidth: number) => {
    if (screenWidth > 390) {
      return 15;
    } else if (screenWidth > 320) {
      return 13;
    } else {
      return 12;
    }
  };

  const fontSize = getFontSize(width);

  return (
    <Pressable
      style={({pressed}) => [styles.wrapper, style, pressed && styles.pressed]}
    >
      <Typography
        fontType="bold"
        textStyle={[styles.text, {fontSize: fontSize}]}
      >
        {text}
      </Typography>
      {Image && <Image color={COLORS.neutral900} style={styles.icon} />}
    </Pressable>
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
    flex: 1,
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
  pressed: {
    opacity: 0.7,
  },
});
