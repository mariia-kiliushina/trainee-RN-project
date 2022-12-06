import {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Pressable,
  ListRenderItem,
  ListRenderItemInfo,
  SafeAreaView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Typography} from 'src/components/Typography';
import {TPost} from 'src/store/postsSlice/types';
import {fetchPosts} from 'src/store/postsSlice/slice';
import {selectPosts, selectStatus} from 'src/store/postsSlice/selectors';
import {useAppDispatch, useAppSelector} from 'src/hooks';
import {COLORS} from 'src/constants/colors';

export const Posts = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    console.log('status');
    console.log(status);
  }, [status]);

  const data = posts;

  const Post = ({title, body}: Omit<TPost, 'id' | 'userId'>) => (
    <Pressable style={styles.pressableCard}>
      <Typography variant="16" fontType="bold">
        {title}
      </Typography>
      <Typography variant="16">{body}</Typography>
    </Pressable>
  );

  const renderItem: ListRenderItem<TPost> = ({
    item,
  }: ListRenderItemInfo<TPost>) => <Post title={item.title} body={item.body} />;

  const keyExtractor = (item: TPost) => {
    return item.id;
  };

  return (
    <SafeAreaView style={[styles.safeAreaStyle, {paddingTop: insets.top}]}>
      {status === true && <Typography>LOADING</Typography>}
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    backgroundColor: COLORS.genericWhite,
  },
  pressableCard: {
    backgroundColor: COLORS.cardFiller,
    marginBottom: 10,
    borderRadius: 6,
    padding: 15,
  },
  list: {
    paddingHorizontal: 20,
  },
});
