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
  useWindowDimensions,
  BackHandler,
  Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Swipeable} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';

import {HomeTabScreenProps} from 'src/navigation/types';
import {usePosts} from 'src/hooks/usePosts';
import {Container} from 'src/components/Container';
import {Card} from 'src/components/Card';
import {Typography} from 'src/components/Typography';
import {PostReanimated} from 'src/components/PostReanimated';
import {COLORS} from 'src/constants/colors';
import {cardsData} from './mock';
import {PostRightAction} from 'src/components/PostRightAction';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PADDING_HORIZONTAL = 20;

export const Home = ({navigation}: HomeTabScreenProps<'Home'>) => {
  const {posts, postsFetchError} = usePosts();
  const {width: screenWidth} = useWindowDimensions();
  const isFocused = useIsFocused();

  const postsSlice = posts.slice(0, 10);

  const rowsRefsArray = useRef<Swipeable[]>([]);
  const previouslyOpenedRow = useRef<Swipeable | null>(null);

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }
  }, [isFocused]);

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

  const slideRowBack = () => {
    previouslyOpenedRow.current?.close();
    previouslyOpenedRow.current = null;
  };

  return (
    <Container
      viewType="fixed"
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickTransactions}
          contentContainerStyle={[
            styles.quickTransactionsContainer,
            {minWidth: screenWidth},
          ]}
        >
          {cardsData.map((card, index) => {
            return (
              <Card
                key={card.iconName}
                text={card.text}
                iconName={card.iconName}
                isLast={cardsData.length - 1 === index}
                index={index}
                onPress={onCardPress}
              />
            );
          })}
        </ScrollView>
      </View>
      <ScrollView style={styles.flex}>
        <View style={styles.contentWrapper}>
          {Platform.OS === 'ios' && (
            <Pressable onPress={onNavigateToGeolocation}>
              <View style={styles.card}>
                <Typography variant="18">Set my geolocation</Typography>
              </View>
            </Pressable>
          )}
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
              onSwipeableWillOpen={() => closeRow(post.id)}
              renderRightActions={() => (
                <PostRightAction postId={post.id} slideRowBack={slideRowBack} />
              )}
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
  contentContainerStyle: {
    paddingHorizontal: 0,
  },
  flex: {
    flex: 1,
  },
  quickTransactionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  quickTransactions: {
    marginBottom: 15,
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
  containerStyle: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 20,
  },
});
