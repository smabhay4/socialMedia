const Post = require("../models/post");
const User = require("../models/user");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };

    const newPost = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.unshift(newPost._id);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Post Created",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.remove();

    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);

    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.likeAndUnlikePost = async (req, res) => {
  console.log("in likeandunlike");
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    }

    post.likes.push(req.user._id);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post Liked",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    let posts = await Post.find({
      owner: { $in: user.following },
    }).populate("owner likes comments.user");

    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(500).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(500).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.caption = req.body.caption;
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.comment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    const commentArray = post.comments;
    let index = -1;

    commentArray.forEach((element, id) => {
      if (element.user.toString() === req.user._id.toString()) {
        index = id;
        return;
      }
    });

    if (index !== -1) {
      commentArray[index].comment = req.body.comment;
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Comment Updated",
      });
    }

    commentArray.push({ user: req.user._id, comment: req.body.comment });
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Comment Added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId == undefined)
        return res.status(400).json({
          success: false,
          message: "CommentId Is Required",
        });
      post.comments.forEach((item, index) => {
        if (req.body.commentId.toString() === item._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Selected Comment Has Deleted",
      });
    }

    post.comments.forEach((item, index) => {
      if (req.user._id.toString() === item.user.toString()) {
        return post.comments.splice(index, 1);
      }
    });

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Your Comment Has Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; ++i) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
