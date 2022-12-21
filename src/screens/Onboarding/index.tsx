import {StyleSheet, Linking} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {RootStackScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {COLORS} from 'src/constants/colors';
import {Logo} from 'src/assets/svg/index';

export const Onboarding = ({
  navigation,
}: RootStackScreenProps<'Onboarding'>) => {
  const devices = useCameraDevices();

  const hasCamera = devices.back || devices.front;

  const onLogin = () => {
    navigation.navigate('ScrollScreen');
  };

  const onNavigateToVideo = () => {
    Camera.requestCameraPermission().then(response => {
      if (response === 'authorized') {
        navigation.navigate('Video');
      } else {
        navigation.navigate('PopUpModal', {
          body: 'Video recording error',
          buttonText: 'Go back',
          secondButtonText: 'Go to settings',
          onSecondButtonPress: Linking.openSettings,
        });
      }
    });
  };

  return (
    <Container contentLayout={styles.contentLayout} style={styles.style}>
      <Logo style={styles.logo} />
      <Button type="primary" onPress={onLogin} style={styles.button}>
        Get started
      </Button>
      {!!hasCamera && (
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
