import {createAsyncThunk} from '@reduxjs/toolkit';
import {TPost} from 'src/store/postsSlice/types';

export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return (await response.json()) as TPost[];
});
