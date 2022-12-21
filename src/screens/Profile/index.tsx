import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Container} from 'src/components/Container';
import {ImageType, ProfilePhoto} from 'components/ProfilePhoto';
import {logOutUser} from 'src/store/profileSlice/slice';
import {Button} from 'src/components/Button';
import {useAppDispatch} from 'src/hooks/redux';
import {STORAGE} from 'src/constants/storage';
import EncryptedStorage from 'react-native-encrypted-storage';

export const Profile = () => {
  const [image, setImage] = useState<ImageType>({
    data: '',
    mime: '',
  });

  useEffect(() => {}, [image]);

  const dispatch = useAppDispatch();

  const onLogOut = () => {
    dispatch(logOutUser());
  };
  const onCleanStorage = () => {
    removeItem(STORAGE.loginStorage);
  };

  async function removeItem(itemName: string) {
    try {
      await EncryptedStorage.removeItem(itemName);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <ProfilePhoto setImageParent={setImage} />
      <Button type="secondary" onPress={onCleanStorage}>
        Clean storage
      </Button>

      <Button style={styles.button} type="secondary" onPress={onLogOut}>
        Log out
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
  },
});
