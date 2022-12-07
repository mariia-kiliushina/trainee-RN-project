import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import {BaseList} from 'src/components/BaseList';
import {SelectAddPhotoOption} from 'components/SelectItems/SelectAddPhotoOption';
import {HomeTabScreenProps} from 'src/navigation/types';
import ProfilePhotoPlacehoder from 'assets/img/avatarPlaceholder.png';
import {Button} from 'components/Button';

export type Option = {
  name: string;
  iconName: string;
};

export type ImageType = {
  data: string | null | undefined;
  mime: string;
};

type Props = {
  setImageParent: (image: ImageType) => any;
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

  const [image, setImage] = useState<ImageType>({
    data: '',
    mime: '',
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
    ? `data:${image.mime};base64,${image.data}`
    : defaultPath;

  return (
    <View style={styles.wrapper}>
      <Image source={{uri: imageSource}} style={styles.avatar} />
      <Button onPress={onAddPhoto} type="primary">
        Add profile photo
      </Button>
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
});
