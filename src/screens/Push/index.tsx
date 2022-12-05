import {View, StyleSheet} from 'react-native';
import {Container} from 'src/components/Container';
import {COLORS} from 'src/constants/colors';

export const Push = () => {
  return (
    <Container
      style={styles.style}
      contentLayout={styles.contentLayout}
    ></Container>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.genericWhite,
  },
  contentLayout: {
    justifyContent: 'center',
  },
});
