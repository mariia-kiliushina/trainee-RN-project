import {createAsyncThunk} from '@reduxjs/toolkit';
import {TPost} from 'src/store/postsSlice/types';
import {RootState} from '../index';

type ThunkError = {
  error: string;
};

export const deletePostById = createAsyncThunk<
  number,
  number,
  {rejectValue: ThunkError}
>('deletePostById', async id => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {method: 'DELETE'},
    );
    if (!response.ok) {
      throw new Error('connection error');
    }
    return id;
  } catch (e: any) {
    throw new Error(e?.message);
  }
});

export const fetchPosts = createAsyncThunk<
  TPost[],
  undefined,
  {rejectValue: ThunkError}
>(
  'fetchPosts',
  async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      if (!response.ok) {
        throw new Error('connection error');
      }
      return (await response.json()) as TPost[];
    } catch (e: any) {
      throw new Error(e?.message);
    }
  },
  {
    condition: (_, {getState}) => {
      const {posts} = getState() as RootState;
      const arePostsCached = posts.posts.length;
      if (arePostsCached) {
        return false;
      }
    },
  },
);
