import {StyleSheet, Pressable} from 'react-native';
import {Typography} from 'src/components/Typography';
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
  onPress: () => void;
};

export const Card = ({text, iconName, isLast, onPress}: Props) => {
  const Image = iconName ? images[iconName] : undefined;

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.wrapper,
        !isLast && styles.rightMargin,
        pressed && styles.pressed,
      ]}
    >
      <Typography fontType="bold" textStyle={[styles.text]}>
        {text}
      </Typography>
      {Image && <Image color={COLORS.neutral900} style={styles.icon} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    aspectRatio: 1,
    padding: 10,
    backgroundColor: COLORS.cardFiller,
    borderRadius: 10,
    minWidth: 90,
    maxWidth: 120,
  },
  rightMargin: {
    marginRight: 5,
  },
  text: {
    color: COLORS.neutral900,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  pressed: {
    opacity: 0.8,
  },
});
