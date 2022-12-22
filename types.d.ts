type Like = string[] | null;

type User = {
  _id: string;
  image: string;
  userName: string;
};

export type CommentType = {
  _key: string;
  comment: string;
  likes: Like;
  postedBy: User;
  _createdAt: string;
};

export type Video = {
  _id: string;
  caption: string;
  comments: CommentType[];
  likes: Like;
  postedBy: User;
  video: {
    _id: string;
    url: string;
  };
  _createdAt: string;
};

export type DecodedGoogleCredentials = {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: true;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
};

export type AuthStore = {
  userProfile: null | User;
  logInUser: (user: User) => void;
  logOutUser: () => void;
  modalLoginIsOpen: boolean;
  handleCloseModalLogin: () => void;
  handleOpenModalLogin: () => void;
};
