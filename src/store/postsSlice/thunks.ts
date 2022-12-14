import {createAsyncThunk} from '@reduxjs/toolkit';
import {TPost} from 'src/store/postsSlice/types';
import {RootState} from '../index';

const responseHandler = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Request failed from responseHandler');
};

export const deletePostById = createAsyncThunk<number | undefined, number>(
  'deletePostById',
  async id => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {method: 'DELETE'},
      );
      const responseBody = await responseHandler(response);
      console.log(responseBody);
      return id;
    } catch (error) {
      console.error(error);
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
        // Return the known error for future handling
        return thunkApi.rejectWithValue({error: 'error message'});
      }
      return (await response.json()) as TPost[];
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
