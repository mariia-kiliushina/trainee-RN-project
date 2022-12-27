import {useEffect, useRef} from 'react';
import {
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
import {Typography} from 'src/components/Typography';
import {SwipeableComponent} from 'src/components/SwipeableComponent';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {PostRightAction} from 'src/components/PostRightAction';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const PADDING_HORIZONTAL = 20;

export const Posts = ({navigation}: RootStackScreenProps<'Posts'>) => {
  const rowsRefsArray = useRef<Swipeable[]>([]);
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

  const closeRow = (itemId: number) => {
    if (
      previouslyOpenedRow.current &&
      previouslyOpenedRow.current !== rowsRefsArray.current[itemId]
    ) {
      previouslyOpenedRow.current.close();
    }
    previouslyOpenedRow.current = rowsRefsArray.current[itemId];
  };

  const slideRowBack = () => {
    previouslyOpenedRow.current?.close();
    previouslyOpenedRow.current = null;
  };

  const renderItem: ListRenderItem<TPost> = ({item}) => (
    <SwipeableComponent
      title={item.title}
      body={item.body}
      ref={(rowRef: any) => {
        if (rowRef) {
          rowsRefsArray.current[item.id] = rowRef;
        }
      }}
      onSwipeableWillOpen={() => closeRow(item.id)}
      renderRightActions={() => (
        <PostRightAction postId={item.id} slideRowBack={slideRowBack} />
      )}
      containerStyle={styles.containerStyle}
      overshootRight={false}
    />
  );

  return (
    <Container
      viewType="fixed"
      contentContainerStyle={styles.contentContainerStyle}
    >
      {postsFetchError && (
        <View style={styles.errorHandler}>
          <Typography textStyle={styles.text}>{postsFetchError}</Typography>
          <Button type="secondary" onPress={navigation.goBack}>
            <Typography>Go back</Typography>
          </Button>
        </View>
      )}

      <FlatList data={posts} renderItem={renderItem} />
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 20,
  },
  contentContainerStyle: {
    paddingHorizontal: 0,
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
});
