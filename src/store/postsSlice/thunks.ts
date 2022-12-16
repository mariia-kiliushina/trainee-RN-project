import {createAsyncThunk} from '@reduxjs/toolkit';
import {TPost} from 'src/store/postsSlice/types';
import {fetchWithErrorCatching, ThunkConfig} from '../helpers';

export const deletePostById = createAsyncThunk<number, number, ThunkConfig>(
  'deletePostById',
  async id => {
    await fetchWithErrorCatching(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {method: 'DELETE'},
    );
    return id;
  },
);

export const fetchPosts = createAsyncThunk<TPost[], undefined, ThunkConfig>(
  'fetchPosts',
  async () => {
    const posts = await fetchWithErrorCatching(
      'https://jsonplaceholder.typicode.com/posts',
    );
    return posts;
  },
  {
    condition: (_, {getState}) => {
      const {posts} = getState();
      const arePostsCached = posts.posts.length;
      if (arePostsCached) {
        return false;
      }
    },
  },
);
