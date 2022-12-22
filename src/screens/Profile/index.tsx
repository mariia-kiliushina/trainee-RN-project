import {useEffect, useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {logOutUser} from 'src/store/profileSlice/slice';
import {useAppDispatch} from 'src/hooks/redux';
import {HomeTabScreenProps} from 'src/navigation/types';
import {Container} from 'src/components/Container';
import {ImageType, ProfilePhoto} from 'components/ProfilePhoto';
import {Button} from 'src/components/Button';
import {STORAGE} from 'src/constants/storage';

export const Profile = ({navigation}: HomeTabScreenProps<'Profile'>) => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<ImageType>({
    data: '',
    mime: '',
  });

  useEffect(() => {}, [image]);

  const onLogOut = () => {
    dispatch(logOutUser());
  };
  const onCleanStorage = () => {
    removeItem(STORAGE.loginStorage);
  };
  const onChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  async function removeItem(itemName: string) {
    try {
      await EncryptedStorage.removeItem(itemName);
    } catch (error) {
      console.log(error);
    }
  }

  const devices = useCameraDevices();

  const hasCamera = devices.back || devices.front;

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
    <Container>
      <ProfilePhoto setImageParent={setImage} />
      <View style={styles.wrapper}>
        {!!hasCamera && (
          <Button
            type="primary"
            onPress={onNavigateToVideo}
            style={styles.button}
          >
            Create biometry snapshot
          </Button>
        )}
        <Button style={styles.button} type="primary" onPress={onChangePassword}>
          Change password
        </Button>
        <Button type="secondary" onPress={onCleanStorage}>
          Clean storage
        </Button>
        <Button style={styles.button} type="secondary" onPress={onLogOut}>
          Log out
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  wrapper: {
    marginTop: 20,
    justifyContent: 'center',
  },
});
