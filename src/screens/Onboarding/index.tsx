import {StyleSheet, Linking, PermissionsAndroid, Platform} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import Geolocation from 'react-native-geolocation-service';
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

  const onNavigateToGeolocation = async () => {
    let response;
    if (Platform.OS === 'android') {
      response = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    if (Platform.OS === 'ios') {
      response = await Geolocation.requestAuthorization('whenInUse');
    }

    if (
      response === PermissionsAndroid.RESULTS.GRANTED ||
      response === 'granted'
    ) {
      navigation.navigate('GeolocationScreen');
    } else {
      navigation.navigate('PopUpModal', {
        body: 'Unable to work without acces to your location',
        buttonText: 'Go to settings',
        secondButtonText: 'Go back',
        onButtonPress: Linking.openSettings,
      });
    }
  };

  return (
    <Container contentContainerStyle={styles.contentContainerStyle} style={styles.style}>
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
      <Button
        type="primary"
        onPress={onNavigateToGeolocation}
        style={styles.button}
      >
        Show geolocation
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
