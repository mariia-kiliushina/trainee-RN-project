import {Pressable, StyleSheet, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {Typography} from '../Typography';
import {SelectPhotoProps} from './types';
import {Camera, Upload, IconsType} from 'src/assets/svg';
import {useNavigation} from '@react-navigation/native';
import ImagePicker, {
  Image as ImagePickerType,
} from 'react-native-image-crop-picker';
import {Option} from 'components/ProfilePhoto';

const icons: IconsType = {
  Upload,
  Camera,
};

export const SelectAddPhotoOption = ({
  value,
  setImage,
  setImageParent,
}: SelectPhotoProps) => {
  const Icon = value.iconName ? icons[value.iconName] : null;

  const navigation = useNavigation();

  const addPhoto = (item: Option) => {
    const pickOption = item.name === 'Take photo' ? 'openCamera' : 'openPicker';

    ImagePicker[pickOption]({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((profilePhoto: ImagePickerType) => {
        navigation.goBack();
        setImageParent({data: profilePhoto.data, mime: profilePhoto.mime});
        setImage({data: profilePhoto.data, mime: profilePhoto.mime});
      })
      .catch(error => {
        if (error.message === 'User cancelled image selection') {
          navigation.goBack();
          return;
        } else {
          console.log(error.message);
        }
      });
  };

  return (
    <Pressable
      onPress={() => {
        addPhoto(value);
      }}
      style={({pressed}) => pressed && styles.pressed}
    >
      <View style={styles.wrapper}>
        {Icon && <Icon height={25} width={25} color={COLORS.neutral300} />}
        <Typography color={COLORS.neutral900} textStyle={styles.text}>
          {value.name}
        </Typography>
      </View>
      <View style={[styles.bottomLine]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: COLORS.neutral200,
  },
  text: {
    lineHeight: 20,
    marginLeft: 10,
  },
  pressed: {
    opacity: 0.7,
  },
});
