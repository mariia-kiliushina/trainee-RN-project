import {StyleSheet, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {RootStackScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';
import {Logo} from 'src/assets/svg/index';

const ModalContent = () => {
  const navigation = useNavigation();
  return (
    <>
      <Typography textStyle={styles.text}>
        Biometrics is unavailable until camera permission is given
      </Typography>
      <Button type="secondary" onPress={navigation.goBack}>
        <Typography>Go back</Typography>
      </Button>
      <Button type="secondary" onPress={Linking.openSettings}>
        <Typography>Go to settings</Typography>
      </Button>
    </>
  );
};

export const Onboarding = ({
  navigation,
}: RootStackScreenProps<'Onboarding'>) => {
  const devices = useCameraDevices();

  const hasCamera = devices.back || devices.front;

  const onLogin = () => {
    navigation.navigate('Posts');
  };

  const onNavigateToVideo = () => {
    Camera.requestCameraPermission().then(response => {
      if (response === 'authorized') {
        navigation.navigate('Video');
      } else {
        navigation.navigate('PopUpModal', {
          children: <ModalContent />,
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
  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
});
