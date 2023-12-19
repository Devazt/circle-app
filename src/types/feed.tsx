export default interface IFeed {
  id: number;
  avatar: string;
  fullname: string;
  username: string;
  posted_at: string;
  content: string;
  isPicture: boolean;
  picture: string;
  like_count: number;
  comment_count: number;
  isLiked: boolean;
}
