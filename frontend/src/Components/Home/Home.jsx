import React, { useEffect } from "react";
import "./Home.css";
import User from "../User/User.jsx";
import Post from "../Post/Post.jsx";
import { useDispatch } from "react-redux";
import { getFollowingPosts, getAllUsers } from "../../Actions/User";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader.jsx";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  const alert = useAlert();

  const { error: likeError, message } = useSelector((state) => state.like);

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

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: usersLoading } = useSelector(
    //renamed loading to usersLoading
    (state) => state.allUsers
  );

  return loading === true && usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
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
            />
          ))
        ) : (
          <Typography variant="h6">No Users to show</Typography>
        )}
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography variant="h6">No users to show</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
