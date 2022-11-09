import {StyleSheet} from 'react-native';
import {COLORS} from 'constants/colors';
import {Typography} from 'src/components/Typography';
import {Container} from 'src/components/Container';

export const AddRecord = () => {
  return (
    <Container style={styles.style}>
      <Typography>Add record</Typography>
    </Container>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.genericWhite,
  },
});
