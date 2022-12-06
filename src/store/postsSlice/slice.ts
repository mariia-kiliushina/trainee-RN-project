import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {PostsState, TPosts} from 'src/store/postsSlice/types';

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
};

export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return (await response.json()) as TPosts;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
