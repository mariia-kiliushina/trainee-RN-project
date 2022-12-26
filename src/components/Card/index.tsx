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
  index: number;
  onPress: () => void;
};

export const Card = ({text, iconName, isLast, index, onPress}: Props) => {
  const Image = iconName ? images[iconName] : undefined;

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        !isLast && styles.rightMargin,
        index !== 0 && styles.leftMargin,
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
  container: {
    width: 100,
    height: 100,
    maxWidth: 120,
    maxHeight: 120,
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    padding: 8,
    backgroundColor: COLORS.omniPrimaryColor,
  },
  rightMargin: {
    marginRight: 5,
  },
  leftMargin: {
    marginLeft: 'auto',
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
