import {useEffect} from 'react';
import {selectPosts} from 'src/store/postsSlice/selectors';
import {useAppDispatch, useAppSelector} from 'src/hooks/redux';
import {fetchPosts} from 'src/store/postsSlice/thunks';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [posts, dispatch]);

  return posts;
};
