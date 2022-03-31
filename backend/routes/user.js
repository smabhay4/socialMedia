const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  followUser,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUser,
  forgotPassword,
  resetPassword,
  getUserPosts,
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/myProfile").get(isAuthenticated, myProfile);

router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

router.route("/delete/profile").delete(isAuthenticated, deleteMyProfile);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/users").get(isAuthenticated, getAllUser);

router.route("/forgotPassword").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
