import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Post.css";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  likePost,
  addCommentOnPost,
  updatePost,
  deletePost,
} from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  // STATES
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  //------------------handling likes on a post------------------------
  const handleLike = async () => {
    setLiked(!liked);

    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  //------------------handling comment on a post------------------------
  const addCommentHandler = async (e) => {
    e.preventDefault();

    setCommentToggle(!commentToggle);

    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  //------------------handling comment updation of  post------------------------
  const updateCaptionHandler = async (e) => {
    e.preventDefault();

    setCaptionToggle(!captionToggle);

    await dispatch(updatePost(captionValue, postId));

    dispatch(getMyPosts());
  };

  //------------------handling deletion of post-------------------------------------
  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };
  //------------------setting initial value of like on a post------------------------
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      {/* ------------------MOREVERT OPTION FOR LOGIN USER------------------------ */}
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>
      {/* ------------------POST IMAGE------------------------ */}
      <img src={postImage} alt="post" />

      {/* ------------------POST OWNER PHOTO,POST OWNER NAME & CAPTION------------------------ */}
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="user"
          sx={{ height: "3vmax", width: "3vmax" }}
        />

        <Link to={"/user/${ownerId}"}>
          <Typography frontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          frontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      {/* ------------------LIKES COUNT BUTTON ------------------------ */}
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          magin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">
        {/* ------------------HEART BUTTON------------------------ */}
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        {/* ------------------COMMENT BUTTON------------------------ */}
        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>

        {/* ------------------DELETE BUTTON FOR OWNER ONLY------------------------ */}
        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>

      {/* ------------------LIST OF USER LIKED THE POST------------------------ */}
      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>

          {/* ------------------RENDERING USERS ------------------------ */}
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={
                "https://cdn.pixabay.com/photo/2018/03/06/22/57/portrait-3204843__480.jpg" ||
                like.avatar.url
              }
            />
          ))}
        </div>
      </Dialog>

      {/* ------------------LIST OF COMMENTS  ON  THE POST------------------------ */}
      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comment By</Typography>

          {/* ------------------FORM TO ADD COMMENT ------------------------ */}
          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={
                  "https://cdn.pixabay.com/photo/2018/03/06/22/57/portrait-3204843__480.jpg" ||
                  item.user.avatar.url
                }
                comment={item.comment}
                commentId={item._id}
                isAccount={false}
                postId={postId}
              />
            ))
          ) : (
            <Typography>No Comments Yet</Typography>
          )}
        </div>
      </Dialog>

      {/* ------------------FORM TO UPDATE CAPTION ------------------------ */}
      <Dialog
        open={captionToggle}
        onClose={() => setCommentToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          {/* ------------------FORM TO ADD COMMENT ------------------------ */}
          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
