import type {RootState} from 'src/store/index';

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectError = (state: RootState) => state.posts.postsFetchingError;
