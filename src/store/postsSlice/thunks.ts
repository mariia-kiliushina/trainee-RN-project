import {createAsyncThunk} from '@reduxjs/toolkit';
import {TPost} from 'src/store/postsSlice/types';

export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return (await response.json()) as TPost[];
});

export const deletePostById = createAsyncThunk(
  'deletePostById',
  async (id: number) => {
    try {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'DELETE',
      });
      return id as number;
    } catch (error: any) {
      console.log(error.message);
      throw new Error('Request rejected');
    }
  },
);
