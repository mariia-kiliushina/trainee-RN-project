import {useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Platform,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RootStackScreenProps} from 'src/navigation/types';
import {TPost} from 'src/store/postsSlice/types';
import {usePosts} from 'src/hooks/usePosts';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {Typography} from 'src/components/Typography';
import {CrossClose} from 'src/assets/svg';
import {COLORS} from 'src/constants/colors';

const PADDING_HORIZONTAL = 20;

export const PostsReanimated = ({
  navigation,
}: RootStackScreenProps<'PostsReanimated'>) => {
  const postsData = usePosts();

  const rowsRefsArray = useRef<Swipeable[]>([]);
  const previouslyOpenedRow = useRef<Swipeable | null>(null);

  const isIOS = Platform.OS === 'ios';

  const closeRow = (itemId: number) => {
    if (
      previouslyOpenedRow.current &&
      previouslyOpenedRow.current !== rowsRefsArray.current[itemId]
    ) {
      previouslyOpenedRow.current.close();
    }
    previouslyOpenedRow.current = rowsRefsArray.current[itemId];
  };

  const renderRightActions = () => (
    <View style={[styles.rightActionStyle, !isIOS && styles.shadow]}>
      <Pressable
        style={({pressed}) => [styles.closeButton, pressed && styles.pressed]}
        onPress={onNavigateToPopUpModal}
      >
        <CrossClose height={24} width={24} />
      </Pressable>
    </View>
  );

  const onCloseModal = () => {
    previouslyOpenedRow?.current?.close();
    previouslyOpenedRow.current = null;
    navigation.goBack();
  };

  const ModalContent = () => {
    return (
      <>
        <Typography textStyle={styles.text}>Choose option</Typography>
        <Button type="secondary" onPress={onCloseModal}>
          <Typography>Go back</Typography>
        </Button>
        <Button type="primary" onPress={onCloseModal}>
          <Typography>Yes</Typography>
        </Button>
      </>
    );
  };

  const onNavigateToPopUpModal = () => {
    navigation.navigate('PopUpModal', {
      children: <ModalContent />,
    });
  };

  const renderItem: ListRenderItem<TPost> = ({
    item,
  }: ListRenderItemInfo<TPost>) => (
    <View key={item.id}>
      <Swipeable
        ref={rowRef => {
          if (rowRef) {
            rowsRefsArray.current[item.id] = rowRef;
          }
        }}
        onSwipeableWillOpen={() => closeRow(item.id)}
        renderRightActions={renderRightActions}
        containerStyle={[styles.containerStyle, isIOS && styles.shadow]}
        childrenContainerStyle={[styles.childrenContainerStyle]}
        overshootRight={false}
      >
        <Pressable style={[styles.rowVisibleOuterShadow, styles.shadow]}>
          <View style={styles.rowVisibleInner}>
            <Typography numberOfLines={1} variant="18" fontType="bold">
              {item.title}
            </Typography>
            <Typography numberOfLines={2} variant="16">
              {item.body}
            </Typography>
          </View>
        </Pressable>
      </Swipeable>
    </View>
  );

  return (
    <Container
      hasKeyboardAwareScrollView={false}
      contentLayout={styles.contentLayout}
    >
      <FlatList data={postsData} renderItem={renderItem} />
    </Container>
  );
};

const styles = StyleSheet.create({
  contentLayout: {
    paddingHorizontal: 0,
  },
  containerStyle: {
    paddingLeft: PADDING_HORIZONTAL,
  },
  childrenContainerStyle: {
    marginRight: PADDING_HORIZONTAL,
  },
  rowVisibleOuterShadow: {
    marginBottom: 20,
  },
  rowVisibleInner: {
    backgroundColor: COLORS.genericWhite,
    padding: 10,
  },
  rightActionStyle: {
    right: -PADDING_HORIZONTAL,
    backgroundColor: COLORS.genericWhite,
    marginBottom: 20,
  },
  closeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: COLORS.shadow,
        borderRadius: 6,
      },
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    }),
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    textAlign: 'center',
    marginBottom: 15,
  },
});
