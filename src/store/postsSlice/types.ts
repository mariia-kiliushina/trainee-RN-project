export type TPost = {
  userId: string;
  id: string;
  title: string;
  body: string;
};
export type TPosts = TPost[];

export type PostsState = {
  posts: TPosts;
  loading: boolean;
  error: string;
};
