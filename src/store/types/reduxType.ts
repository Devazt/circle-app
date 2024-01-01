interface follower {
  id: number;
}

interface following {
  id: number;
}

export interface IReduxUser {
  id: number;
  username: string;
  fullname: string;
  email: string;
  photo_profile: string;
  password: string;
  bio: string;
  following: follower[];
  follower: following[];
  numfollowers: number;
  numfollowing: number;
}
