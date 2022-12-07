import {StyleSheet, Pressable} from 'react-native';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';

type Props = {
  title: string;
  body: string;
};

export const Post = ({title, body}: Props) => {
  return (
    <Pressable style={styles.pressableCard}>
      <Typography variant="16" fontType="bold">
        {title}
      </Typography>
      <Typography variant="16">{body}</Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableCard: {
    backgroundColor: COLORS.cardFiller,
    marginBottom: 10,
    borderRadius: 6,
    padding: 15,
  },
});
