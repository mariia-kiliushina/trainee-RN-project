import {StyleSheet} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {RootStackScreenProps} from 'src/navigation/types';
import {COLORS} from 'src/constants/colors';
import {Logo} from 'src/assets/svg/index';

export const Onboarding = ({
  navigation,
}: RootStackScreenProps<'Onboarding'>) => {
  const devices = useCameraDevices();
  const frontalCamera = devices.front;

  const onLogin = () => {
    navigation.navigate('Login');
  };

  const onNavigateToVideo = () => {
    navigation.navigate('Video');
  };

  return (
    <Container contentLayout={styles.contentLayout} style={styles.style}>
      <Logo style={styles.logo} />
      <Button type="primary" onPress={onLogin} style={styles.button}>
        Get started
      </Button>
      {frontalCamera && (
        <Button
          type="primary"
          onPress={onNavigateToVideo}
          style={styles.button}
        >
          Create biometry snapshot
        </Button>
      )}
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
