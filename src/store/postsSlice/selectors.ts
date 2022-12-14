import type {RootState} from 'src/store/index';

export const selectPosts = (state: RootState) => state.posts.posts;
