import {StyleSheet} from 'react-native';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {RootStackScreenProps} from 'src/navigation/types';
import {COLORS} from 'src/constants/colors';
import {Logo} from 'assets/svg/index';

export const Onboarding = ({
  navigation,
}: RootStackScreenProps<'Onboarding'>) => {
  const onPress = () => {
    navigation.navigate('Login');
  };

  return (
    <Container contentLayout={styles.contentLayout} style={styles.style}>
      <Logo style={styles.logo} />
      <Button type="primary" onPress={onPress} style={styles.button}>
        Get started
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentLayout: {
    justifyContent: 'center',
  },
  style: {
    backgroundColor: COLORS.omniPrimaryColor,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.omniDark,
  },
});
