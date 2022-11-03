import {StyleSheet} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Container} from 'src/components/Container';

export const AddRecord = () => {
  return (
    <Container style={styles.main} backgroundStyle={styles.background}>
      <Typography>Add record</Typography>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.primary100,
    paddingHorizontal: 20,
  },
  background: {
    backgroundColor: COLORS.genericWhite,
  },
});
