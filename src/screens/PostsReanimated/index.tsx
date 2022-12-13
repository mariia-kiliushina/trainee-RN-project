import {useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RootStackScreenProps} from 'src/navigation/types';
import {TPost} from 'src/store/postsSlice/types';
import {Container} from 'src/components/Container';
import {Button} from 'src/components/Button';
import {Typography} from 'src/components/Typography';
import {usePosts} from 'src/hooks/usePosts';
import {CrossClose} from 'src/assets/svg';
import {COLORS} from 'src/constants/colors';

const PADDING_HORIZONTAL = 20;

export const PostsReanimated = ({
  navigation,
}: RootStackScreenProps<'PostsReanimated'>) => {
  const postsData = usePosts();

  const rowsRefsArray = useRef<Swipeable[]>([]);
  const previouslyOpenedRow = useRef<Swipeable | null>(null);

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
    <View style={styles.rightActionStyle}>
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

  const renderItem: ListRenderItem<TPost> = ({item}) => (
    <Swipeable
      ref={rowRef => {
        if (rowRef) {
          rowsRefsArray.current[item.id] = rowRef;
        }
      }}
      onSwipeableWillOpen={() => closeRow(item.id)}
      renderRightActions={renderRightActions}
      containerStyle={styles.containerStyle}
      overshootRight={false}
    >
      <View style={styles.rowVisible}>
        <Typography numberOfLines={1} variant="18" fontType="bold">
          {item.title}
        </Typography>
        <Typography numberOfLines={2} variant="16">
          {item.body}
        </Typography>
      </View>
    </Swipeable>
  );

  return (
    <Container viewType="fixed" contentLayout={styles.contentLayout}>
      <FlatList data={postsData} renderItem={renderItem} />
    </Container>
  );
};

const styles = StyleSheet.create({
  contentLayout: {
    paddingHorizontal: 0,
  },
  containerStyle: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: 20,
  },
  rowVisible: {
    backgroundColor: COLORS.genericWhite,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
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
});
