import React, { useEffect, useState } from "react";
import "./Account.css";
import {
  getMyPosts,
  logoutUser,
  deleteProfile,
  loadUser,
} from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Post from "../Post/Post.jsx";
import { Avatar, Typography, Button, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import User from "../User/User.jsx";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    alert.success("Logged out successfully");
    dispatch(loadUser());
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(likeError);
      dispatch({ type: "clearError" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearError" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, likeError, message]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map(
            (post) =>
              post && (
                <Post
                  key={post._id}
                  postId={post._id}
                  caption={post.caption}
                  postImage={post.image.url}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage={post.owner.avatar.url}
                  ownerName={post.owner.name}
                  ownerId={post.owner._id}
                  isAccount={true}
                  isDelete={true}
                />
              )
          )
        ) : (
          <Typography variant="h5">No Users to show</Typography>
        )}
      </div>

      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user.name}</Typography>

        <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user && user.followers.length}</Typography>
        </div>

        <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user && user.following.length}</Typography>
        </div>

        <div>
          <Typography>Posts</Typography>
          <Typography>{user && user.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>

        <Link to="/update/password">Change Password</Link>

        <Button
          disabled={deleteLoading}
          onClick={deleteProfileHandler}
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
        >
          Delete My Profile
        </Button>

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followed By</Typography>

            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>No Followers</Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following To</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((following) => (
                <User
                  key={following._id}
                  userId={following._id}
                  name={following.name}
                  avatar={following.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                Following To None
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
