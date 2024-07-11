const { Post } = require("../models");
const postData = [{
    title: "Post 1",
    content: "This is the first post",
    userId: 1
},
{
    title: "Post 2",
    content: "This is the second post",
    userId: 1
}];
const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;