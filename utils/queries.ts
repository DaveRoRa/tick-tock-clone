export const allPostsQuery = /* groq */ `*[_type == "post"] | order(_createdAt desc){
    _id,
    caption,
    "video": video.asset->{
          _id,
          url
      }
    ,
    postedBy->{
      _id,
      userName,
      image
    },
    likes,
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
    },
    }
  }`;

export const postDetailQuery = (postId: string | string[]) => {
  const query = /* groq */ `*[_type == "post" && _id == '${postId}']{
    _id,
    caption,
      "video": video.asset->{
          _id,
          url
        },
    postedBy->{
      _id,
      userName,
      image
    },
    "likes":likes[]->_id,
    comments[]{
      comment,
      _key,
      _createdAt,
      "likes":likes[]->_id,
      postedBy->{
        image,
        userName,
        _id,
      },
    },
    _createdAt
  }`;
  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = /* groq */ `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
likes,
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;
  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = /* groq */ `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = /* groq */ `*[_type == "user"]`;

  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = /* groq */ `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = /* groq */ `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};

export const topicPostsQuery = (topic: string | string[]) => {
  const query = /* groq */ `*[_type == "post" && topic match '${topic}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`;

  return query;
};
