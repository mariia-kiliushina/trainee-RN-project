import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePosts} from 'src/hooks/usePosts';
import {TPost} from 'src/store/postsSlice/types';
import {Post} from 'src/components/Post';
import {Container} from 'src/components/Container';
import {COLORS} from 'src/constants/colors';

export const Posts = () => {
  const insets = useSafeAreaInsets();

  const data = usePosts();

  const renderItem: ListRenderItem<TPost> = ({
    item,
  }: ListRenderItemInfo<TPost>) => <Post title={item.title} body={item.body} />;

  return (
    <Container
      style={styles.safeAreaStyle}
      contentLayout={{paddingTop: insets.top}}
      hasKeyboardAwareScrollView={false}
    >
      <FlatList style={styles.list} data={data} renderItem={renderItem} />
    </Container>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    backgroundColor: COLORS.genericWhite,
  },
  list: {
    paddingHorizontal: 20,
  },
});
