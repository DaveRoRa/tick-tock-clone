export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "postedBy",
      title: "PostedBy",
      type: "postedBy",
    },
    {
      name: "comment",
      title: "Comment",
      type: "string"
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
  ]
};