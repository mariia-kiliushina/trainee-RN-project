import {useState} from 'react';
import {Image, StyleSheet, Button, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

type TImage = {
  path: string;
};

export const Avatar = () => {
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
  return (
    <View>
      <Image source={{uri: imagePath}} style={styles.avatar} />
      <Button title="upload" onPress={pickPicture} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
});
