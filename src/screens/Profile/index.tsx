import {Container} from 'src/components/Container';
import {StyleSheet} from 'react-native';
import {ProfilePhoto} from 'components/ProfilePhoto';

export const Profile = () => {
  return (
    <Container style={styles.flex}>
      <ProfilePhoto />
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
