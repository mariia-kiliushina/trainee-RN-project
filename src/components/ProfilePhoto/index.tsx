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
import {BaseList} from 'src/components/BaseList';
import {SelectAddPhotoOption} from 'components/SelectItems/SelectAddPhotoOption';
import {HomeTabScreenProps} from 'src/navigation/types';
import ProfilePhotoPlacehoder from 'assets/img/avatarPlaceholder.png';
import {Typography} from '../Typography';
import {COLORS} from 'src/constants/colors';

type Props = {
  setImageParent: (image: any) => any;
};
export type Option = {
  name: string;
  iconName: string;
};

const addPhotoOptions = [
  {
    name: 'Take photo',
    iconName: 'Camera',
  },
  {
    name: 'Upload photo',
    iconName: 'Upload',
  },
];

export const ProfilePhoto = ({setImageParent}: Props) => {
  const navigation =
    useNavigation<HomeTabScreenProps<'Profile'>['navigation']>();

  const [image, setImage] = useState<{
    data: string | null | undefined;
    mimeType: string;
  }>({
    data: '',
    mimeType: '',
  });

  const keyExtractor = (item: Option) => item.name;

  const renderItem: ListRenderItem<Option> = ({
    item,
  }: ListRenderItemInfo<Option>) => (
    <SelectAddPhotoOption
      value={item}
      setImage={setImage}
      setImageParent={setImageParent}
    />
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
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 44,
    backgroundColor: COLORS.warning500,
    borderRadius: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
