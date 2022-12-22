import {useEffect, useRef} from 'react';
import {
  LayoutAnimation,
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Swipeable} from 'react-native-gesture-handler';
import {HomeTabScreenProps} from 'src/navigation/types';
import {deletePostById} from 'src/store/postsSlice/thunks';
import {usePosts} from 'src/hooks/usePosts';
import {useAppDispatch} from 'src/hooks/redux';
import {Container} from 'src/components/Container';
import {Card} from 'src/components/Card';
import {Typography} from 'src/components/Typography';
import {PostReanimated} from 'src/components/PostReanimated';
import {COLORS} from 'src/constants/colors';
import {CrossClose} from 'src/assets/svg';
import {cardsData} from './mock';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PADDING_HORIZONTAL = 20;

export const Home = ({navigation}: HomeTabScreenProps<'Home'>) => {
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

  const onCardPress = () => {
    navigation.navigate('Budget');
  };

  const onNavigateToGeolocation = async () => {
    let response;
    if (Platform.OS === 'android') {
      response = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    if (Platform.OS === 'ios') {
      response = await Geolocation.requestAuthorization('whenInUse');
    }

    if (
      response === PermissionsAndroid.RESULTS.GRANTED ||
      response === 'granted'
    ) {
      navigation.navigate('GeolocationScreen');
    } else {
      navigation.navigate('PopUpModal', {
        body: 'Unable to work without acces to your location',
        buttonText: 'Go to settings',
        secondButtonText: 'Go back',
        onButtonPress: Linking.openSettings,
      });
    }
  };

  const onNavigateToAnimation = () => {
    navigation.navigate('Animations');
  };

  return (
    <Container contentLayout={styles.contentLayout}>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sliderContainer}
        >
          {cardsData.map((card, index) => {
            return (
              <Card
                key={card.iconName}
                text={card.text}
                iconName={card.iconName}
                isLast={cardsData.length - 1 === index}
                onPress={onCardPress}
              />
            );
          })}
        </ScrollView>
      </View>
      <ScrollView nestedScrollEnabled={true} style={styles.outerScroll}>
        <View style={styles.contentWrapper}>
          <Pressable onPress={onNavigateToGeolocation}>
            <View style={styles.card}>
              <Typography variant="18">Set my geolocation</Typography>
            </View>
          </Pressable>
          <View style={styles.card} />
          <Pressable onPress={onNavigateToAnimation}>
            <View style={styles.card}>
              <Typography variant="18">Play with animations</Typography>
            </View>
          </Pressable>
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
            <PostReanimated
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
          <Pressable onPress={() => navigation.navigate('Posts')}>
            <View style={styles.card}>
              <Typography variant="18">Go to all posts</Typography>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentLayout: {
    paddingHorizontal: 0,
  },
  sliderContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  outerScroll: {
    marginTop: 20,
    backgroundColor: COLORS.genericWhite,
    height: 1,
  },
  innerScroll: {
    height: 300,
  },
  contentWrapper: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.warning100,
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
