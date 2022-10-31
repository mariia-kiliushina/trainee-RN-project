import {COLORS} from 'constants/colors';
import {Container} from 'src/components/Container';
import {Image, StyleSheet, Button, View} from 'react-native';
import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

type TImage = {
  path: string;
};

export const Profile = () => {
  const [imagePath, setImagePath] = useState('');
  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image: TImage) => {
      setImagePath(image.path);
    });
  };

  const someURL =
    'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif';

  return (
    <Container style={styles.main}>
      <View style={styles.main}>
        <Image
          source={{uri: imagePath ? imagePath : someURL}}
          style={styles.avatar}
        />
        <Button title="upload" onPress={pickPicture} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.primary100,
    paddingHorizontal: 20,
  },
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
});
