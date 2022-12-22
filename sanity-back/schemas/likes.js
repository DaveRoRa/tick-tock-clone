export default {
  name: "likes",
  title: "Likes",
  type: "array",
  of: [
    {
      type: "reference",
      to: [{ type: "user" }]
    }
  ]
};
