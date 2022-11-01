import {ImageType} from 'components/ProfilePhoto';

export type SelectItemProps = {
  value: any;
  onPress: (value: any) => void;
};

export type SelectPhotoProps = {
  value: any;
  setImage: (value: ImageType) => void;
  setImageParent: (value: ImageType) => void;
};
