import {useEffect, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {usePosts} from 'src/hooks/usePosts';
import {TPost} from 'src/store/postsSlice/types';
import {RootStackScreenProps} from 'src/navigation/types';
import {deletePostById} from 'src/store/postsSlice/thunks';
import {useAppDispatch} from 'src/hooks/redux';
import {Typography} from 'src/components/Typography';
import {PostReanimated} from 'src/components/PostReanimated';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {CrossClose} from 'src/assets/svg';
import {COLORS} from 'src/constants/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PADDING_HORIZONTAL = 20;

export const Posts = ({navigation}: RootStackScreenProps<'Posts'>) => {
  const dispatch = useAppDispatch();

  const rowsRefsArray = useRef<any>([]);
  const previouslyOpenedRow = useRef<Swipeable | null>(null);

  const {posts, postsFetchError} = usePosts();

  useEffect(() => {
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext({
        duration: 1000,
        update: {type: 'easeInEaseOut'},
      });
    }
  }, [posts]);

  const renderHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Typography variant="18" textStyle={styles.text}>
          Full posts list
        </Typography>
      </View>
    );
  };

  const closeRow = (itemId: number) => {
    if (
      previouslyOpenedRow.current &&
      previouslyOpenedRow.current !== rowsRefsArray.current[itemId]
    ) {
      previouslyOpenedRow.current.close();
    }
    previouslyOpenedRow.current = rowsRefsArray.current[itemId];
  };

  const renderRightActions = (id: number) => (
    <View style={styles.rightActionStyle}>
      <Pressable
        style={({pressed}) => [styles.closeButton, pressed && styles.pressed]}
        onPress={() => onNavigateToPopUpModal(id)}
      >
        <CrossClose height={24} width={24} />
      </Pressable>
    </View>
  );

  const onCloseModal = () => {
    previouslyOpenedRow?.current?.close();
    previouslyOpenedRow.current = null;
  };

  const onDeletePost = (id: number) => {
    onCloseModal();

    dispatch(deletePostById(id));

    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext({
        duration: 1000,
        update: {type: 'easeInEaseOut', property: 'scaleX'},
        delete: {type: 'easeInEaseOut', property: 'scaleX'},
      });
    }
  };

  const onSwipeableWillOpen = (id: number) => {
    closeRow(id);
  };

  const renderItem: ListRenderItem<TPost> = ({item}) => (
    <PostReanimated
      title={item.title}
      body={item.body}
      ref={(rowRef: any) => {
        if (rowRef) {
          rowsRefsArray.current[item.id] = rowRef;
        }
      }}
      onSwipeableWillOpen={() => onSwipeableWillOpen(item.id)}
      renderRightActions={() => renderRightActions(item.id)}
      containerStyle={styles.containerStyle}
      overshootRight={false}
    />
  );

  const onNavigateToPopUpModal = (postId: number) => {
    navigation.navigate('PopUpModal', {
      body: 'Are you sure you want to delete this post?',
      buttonText: 'Yes',
      onButtonPress: () => onDeletePost(postId),
      secondButtonText: 'No',
      onSecondButtonPress: onCloseModal,
    });
  };

  return (
    <Container viewType="fixed" contentLayout={styles.contentLayout}>
      {postsFetchError && (
        <View style={styles.errorHandler}>
          <Typography textStyle={styles.text}>{postsFetchError}</Typography>
          <Button type="secondary" onPress={navigation.goBack}>
            <Typography>Go back</Typography>
          </Button>
        </View>
      )}

      <FlatList
        data={posts}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
      <Button type="primary" style={styles.button} onPress={navigation.goBack}>
        Go back
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 20,
  },
  contentLayout: {
    paddingHorizontal: 0,
  },
  rightActionStyle: {
    right: -PADDING_HORIZONTAL,
    backgroundColor: COLORS.genericWhite,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    borderLeftColor: 'transparent',
  },
  closeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
  errorHandler: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  listHeader: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.neutral300,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
});
