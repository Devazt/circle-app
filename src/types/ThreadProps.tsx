export type IThreadPost = {
  id?: number;
  content: string;
  image: string;
  created_at: string;
  user: {
    username: string;
    fullname: string;
    photo_profile: string;
  };
  likes: [{
    id: number;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      username: string;
      fullname: string;
      photo_profile: string;
    };
  }]
  likeCount: number;
  replyCount: number;
};

export type IThreadItems = {
  id?: number;
  username: string;
  fullname: string;
  photo_profile: string;
  content: string;
  image: string;
  created_at: string;
  likes: [{
    id: number;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      username: string;
      fullname: string;
      photo_profile: string;
    };
  }]
  likeCount: number;
  replies: number;
}

export type IUseThread = {
  content: string
  image: string
}

