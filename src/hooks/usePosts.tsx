import {useEffect} from 'react';
import {selectError, selectPosts} from 'src/store/postsSlice/selectors';
import {useAppDispatch, useAppSelector} from 'src/hooks/redux';
import {fetchPosts} from 'src/store/postsSlice/thunks';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const postsFetchError = useAppSelector(selectError);

  useEffect(() => {
    console.log('DISPATCH');
    dispatch(fetchPosts());
  });

  return {posts, postsFetchError};
};
