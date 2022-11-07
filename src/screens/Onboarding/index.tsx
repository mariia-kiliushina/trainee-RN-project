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
    <Container style={styles.main} contentLayout={styles.contentLayout}>
      <Logo style={styles.logo} />
      <Button type="primary" onPress={onPress} style={styles.button}>
        Get started
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.omniPrimaryColor,
  },
  contentLayout: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: COLORS.omniDark,
  },
});
