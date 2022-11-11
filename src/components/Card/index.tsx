import {StyleSheet, View} from 'react-native';
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
  isLast: boolean;
  maxSize: number;
};

export const cardMarginRight = 5;

export const Card = ({text, iconName, isLast, maxSize}: Props) => {
  const Image = iconName ? images[iconName] : undefined;
  return (
    <View
      style={[
        styles.wrapper,
        isLast && styles.noRightMargin,
        maxSize >= 0 && {maxHeight: maxSize, maxWidth: maxSize},
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
    flexGrow: 1,
    aspectRatio: 1,
    padding: 10,
    backgroundColor: COLORS.cardFiller,
    borderRadius: 10,
    marginRight: cardMarginRight,
  },
  noRightMargin: {
    marginRight: 0,
  },
  text: {
    color: COLORS.neutral900,
  },
  icon: {
    alignSelf: 'flex-end',
  },
});
