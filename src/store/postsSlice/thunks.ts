import {createAsyncThunk} from '@reduxjs/toolkit';
import {TPost} from 'src/store/postsSlice/types';
import {RootState} from '../index';

export const deletePostById = createAsyncThunk<number | undefined, number>(
  'deletePostById',
  async (id, thunkApi) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {method: 'DELETE'},
      );
      if (!response.ok) {
        return thunkApi.rejectWithValue({error: 'error message'});
      }
      return id;
    } catch {
      return thunkApi.rejectWithValue({error: 'error fetch message'});
    }
  },
);

export const fetchPosts = createAsyncThunk<TPost[]>(
  'fetchPosts',
  async (_, thunkApi) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      if (!response.ok) {
        return thunkApi.rejectWithValue({error: 'error message'});
      }
      return await response.json();
    } catch {
      return thunkApi.rejectWithValue({error: 'error fetch message'});
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
