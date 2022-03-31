const express = require("express");
const {
  createPost,
  deletePost,
  likeAndUnlikePost,
  getPostOfFollowing,
  updateCaption,
  comment,
  deleteComment,
  getMyPosts,
} = require("../controllers/post");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");

router.route("/post/upload").post(isAuthenticated, createPost);

router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);

router.route("/my/posts").get(isAuthenticated, getMyPosts);

router
  .route("/comment/:id")
  .put(isAuthenticated, comment)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
