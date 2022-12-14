import {useCallback, useEffect, useState} from 'react';
import {selectPosts} from 'src/store/postsSlice/selectors';
import {useAppDispatch, useAppSelector} from 'src/hooks/redux';
import {fetchPosts} from 'src/store/postsSlice/thunks';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const [postsFetchError, setPostsFetchError] = useState('');

  const initFunc = useCallback(async () => {
    const fetchResult = await dispatch(fetchPosts());
    if (fetchResult.payload?.error) {
      setPostsFetchError(fetchResult.payload?.error);
    } else {
      setPostsFetchError('');
    }
  }, [dispatch]);

  useEffect(() => {
    initFunc();
  }, [initFunc]);

  return {posts, postsFetchError};
};
