import {useCallback, useEffect, useState} from 'react';
import {selectPosts} from 'src/store/postsSlice/selectors';
import {useAppDispatch, useAppSelector} from 'src/hooks/redux';
import {fetchPosts} from 'src/store/postsSlice/thunks';
import {PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {TPost} from 'src/store/postsSlice/types';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const [postsFetchError, setPostsFetchError] = useState('');

  type action =
    | PayloadAction<
        TPost[],
        string,
        {arg: void; requestId: string; requestStatus: 'fulfilled'},
        never
      >
    | PayloadAction<
        {error: string},
        string,
        {
          arg: void;
          requestId: string;
          requestStatus: 'rejected';
          aborted: boolean;
          condition: boolean;
        } & ({rejectedWithValue: true} | ({rejectedWithValue: false} & {})),
        SerializedError
      >
    | PayloadAction<
        unknown,
        string,
        {
          arg: void;
          requestId: string;
          requestStatus: 'rejected';
          aborted: boolean;
          condition: boolean;
        } & ({rejectedWithValue: true} | ({rejectedWithValue: false} & {})),
        SerializedError
      >;
  const initFunc = useCallback(async () => {
    const fetchResult: action = await dispatch(fetchPosts());
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

//PayloadAction<{
//   payload;
//   type;
//   meta;
//   error;
// };
