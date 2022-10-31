import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  View,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';
import {BaseList} from 'src/components/BaseList';
import {SelectAddPhotoOption} from 'components/SelectItems/SelectAddPhotoOption';
import {HomeTabScreenProps} from 'src/navigation/types';
import ProfilePhotoPlacehoder from 'assets/img/avatarPlaceholder.png';
import {Typography} from '../Typography';
import {COLORS} from 'src/constants/colors';

type Option = {
  name: string;
  iconName: string;
  onPress: () => void;
};

export const ProfilePhoto = () => {
  const [image, setImage] = useState<{
    data: string | null | undefined;
    mimeType: string;
  }>({
    data: '',
    mimeType: '',
  });
  const navigation =
    useNavigation<HomeTabScreenProps<'Profile'>['navigation']>();

  const uploadFromDevice = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(_ => {
        navigation.navigate('Profile');
        return _;
      })
      .then((profilePhoto: ImageType) => {
        setImage({data: profilePhoto.data, mimeType: profilePhoto.mime});
      });
  };

  const takePicture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(_ => {
        navigation.navigate('Profile');
        return _;
      })
      .then((profilePhoto: ImageType) => {
        setImage({data: profilePhoto.data, mimeType: profilePhoto.mime});
      });
  };

  const addPhotoOptions = [
    {
      name: 'Take photo',
      iconName: 'Camera',
      onPress: function () {
        takePicture();
      },
    },
    {
      name: 'Upload photo',
      iconName: 'Upload',
      onPress: function () {
        uploadFromDevice();
      },
    },
  ];

  const keyExtractor = (item: Option) => item.name;

  const renderItem: ListRenderItem<Option> = ({
    item,
  }: ListRenderItemInfo<Option>) => (
    <SelectAddPhotoOption value={item} onPress={item.onPress} />
  );

  const onAddPhoto = () => {
    navigation.navigate('BottomSheetModal', {
      children: (
        <BaseList
          options={addPhotoOptions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      ),
    });
  };
  const defaultPath = Image.resolveAssetSource(ProfilePhotoPlacehoder).uri;

  const imageSource = image.data
    ? `data:${image.mimeType};base64,${image.data}`
    : defaultPath;

  return (
    <View style={styles.wrapper}>
      <Image source={{uri: imageSource}} style={styles.avatar} />
      <Pressable
        style={({pressed}) => [styles.button, pressed && styles.pressed]}
        onPress={onAddPhoto}
      >
        <Typography color={COLORS.base000}>Add profile photo</Typography>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    padding: 12,
    height: 44,
    backgroundColor: COLORS.warning500,
    borderRadius: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
