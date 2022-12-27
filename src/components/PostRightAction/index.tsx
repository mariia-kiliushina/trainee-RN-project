import {useNavigation} from '@react-navigation/native';
import {LayoutAnimation, Platform, StyleSheet, View} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {useAppDispatch} from 'src/hooks/redux';
import {HomeTabScreenProps} from 'src/navigation/types';
import {deletePostById} from 'src/store/postsSlice/thunks';
import {PressableIcon} from '../PressableIcon';

const PADDING_HORIZONTAL = 20;

type TRightActionProps = {
  postId: number;
  slideRowBack: () => void;
};

export const PostRightAction = ({postId, slideRowBack}: TRightActionProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeTabScreenProps<'Home'>['navigation']>();

  const onPress = () => {
    navigation.navigate('PopUpModal', {
      body: 'Are you sure you want to delete this post?',
      buttonText: 'Yes',
      onButtonPress: () => {
        dispatch(deletePostById(postId));
        slideRowBack();
        if (Platform.OS === 'ios') {
          LayoutAnimation.configureNext({
            duration: 1000,
            update: {type: 'easeInEaseOut', property: 'scaleX'},
            delete: {type: 'easeInEaseOut', property: 'scaleX'},
          });
        }
      },
      secondButtonText: 'No',
      onSecondButtonPress: slideRowBack,
    });
  };

  return (
    <View style={styles.rightActionStyle}>
      <PressableIcon
        iconName={'Cross'}
        onPress={onPress}
        color={COLORS.desctructive500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rightActionStyle: {
    right: -PADDING_HORIZONTAL,
    backgroundColor: COLORS.genericWhite,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    borderLeftColor: 'transparent',
    justifyContent: 'center',
  },
});
