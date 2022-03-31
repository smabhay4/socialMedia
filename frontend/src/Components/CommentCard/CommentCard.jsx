import "./CommentCard.css";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { deleteCommentOnPost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandler = async () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>

      {isAccount || userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
