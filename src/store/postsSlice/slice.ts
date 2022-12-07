import {createSlice} from '@reduxjs/toolkit';

import {PostsState} from 'src/store/postsSlice/types';
import {fetchPosts} from 'src/store/postsSlice/thunks';

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
