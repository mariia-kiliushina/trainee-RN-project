import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Container} from 'src/components/Container';
import {ImageType, ProfilePhoto} from 'components/ProfilePhoto';
import {logOutUser} from 'src/store/profileSlice/slice';
import {Button} from 'src/components/Button';
import {useAppDispatch} from 'src/hooks/redux';

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

  return (
    <Container>
      <ProfilePhoto setImageParent={setImage} />
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
