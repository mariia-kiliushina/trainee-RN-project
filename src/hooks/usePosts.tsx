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
    console.log(fetchResult);
    if (fetchPosts.rejected.match(fetchResult) && !fetchResult.meta.condition) {
      setPostsFetchError(fetchResult.error.message || '');
    } else {
      setPostsFetchError('');
    }
  }, [dispatch]);

  useEffect(() => {
    initFunc();
  }, [initFunc]);

  return {posts, postsFetchError};
};
