import {StyleSheet} from 'react-native';
import {RootStackScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {COLORS} from 'src/constants/colors';
import {Logo} from 'src/assets/svg/index';

export const Onboarding = ({
  navigation,
}: RootStackScreenProps<'Onboarding'>) => {
  const onGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <Container
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.style}
    >
      <Logo style={styles.logo} />
      <Button type="primary" onPress={onGetStarted} style={styles.button}>
        Get started
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
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
