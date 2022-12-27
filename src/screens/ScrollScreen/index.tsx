import {useEffect, useRef} from 'react';
import {
  Platform,
  StyleSheet,
  UIManager,
  View,
  Pressable,
  LayoutAnimation,
} from 'react-native';
import {ScrollView, Swipeable} from 'react-native-gesture-handler';
import {RootStackScreenProps} from 'src/navigation/types';
import {deletePostById} from 'src/store/postsSlice/thunks';
import {usePosts} from 'src/hooks/usePosts';
import {Container} from 'src/components/Container';
import {Typography} from 'src/components/Typography';
import {SwipeableComponent} from 'src/components/SwipeableComponent';
import {CrossClose} from 'src/assets/svg';
import {COLORS} from 'src/constants/colors';
import {useAppDispatch} from 'src/hooks/redux';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PADDING_HORIZONTAL = 20;

export const ScrollScreen = ({
  navigation,
}: RootStackScreenProps<'ScrollScreen'>) => {
  const {posts, postsFetchError} = usePosts();

  const postsSlice = posts.slice(0, 10);
  const dispatch = useAppDispatch();

  const rowsRefsArray = useRef<any>([]);
  const previouslyOpenedRow = useRef<Swipeable | null>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext({
        duration: 1000,
        update: {type: 'easeInEaseOut'},
      });
    }
  }, [posts]);

  const onNavigateToPopUpModal = (postId: number) => {
    navigation.navigate('PopUpModal', {
      body: 'Are you sure you want to delete this post?',
      buttonText: 'Yes',
      onButtonPress: () => onDeletePost(postId),
      secondButtonText: 'No',
      onSecondButtonPress: onCloseModal,
    });
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

  return (
    <Container contentContainerStyle={styles.contentContainerStyle}>
      <ScrollView style={styles.outerScroll}>
        <View style={styles.contentWrapper}>
          <Pressable onPress={() => navigation.navigate('Posts')}>
            <View style={styles.card}>
              <Typography variant="18">See all posts</Typography>
            </View>
          </Pressable>
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <View style={styles.card} />
          <Typography variant="18" fontType="bold" textStyle={styles.text}>
            Posts preview
          </Typography>
        </View>
        <ScrollView nestedScrollEnabled={true} style={styles.innerScroll}>
          {postsFetchError && (
            <View>
              <Typography textStyle={styles.text}>
                'Sorry, posts cannot be loaded right now'
              </Typography>
            </View>
          )}
          {postsSlice.map(post => (
            <SwipeableComponent
              key={post.id}
              title={post.title}
              body={post.body}
              ref={(rowRef: any) => {
                if (rowRef) {
                  rowsRefsArray.current[post.id] = rowRef;
                }
              }}
              onSwipeableWillOpen={() => onSwipeableWillOpen(post.id)}
              renderRightActions={() => renderRightActions(post.id)}
              containerStyle={styles.containerStyle}
              overshootRight={false}
            />
          ))}
        </ScrollView>
        <View style={styles.contentWrapper}>
          <View style={styles.card} />
          <View style={styles.card} />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 0,
  },
  outerScroll: {
    backgroundColor: COLORS.genericWhite,
  },
  innerScroll: {
    height: 300,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.cardFiller,
    borderRadius: 10,
    height: 110,
    marginBottom: 15,
    padding: 10,
  },
  text: {
    color: COLORS.neutral500,
    marginBottom: 15,
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
  containerStyle: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 20,
  },
});
