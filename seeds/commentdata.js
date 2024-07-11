const {Comment} = require("../models");
const commentData = [{
    comment_text: "This is a comment",
    user_id: 1,
    post_id: 1
    }, {
        comment_text: "This is another comment",
        user_id: 1,
        post_id: 1

}];
const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;
