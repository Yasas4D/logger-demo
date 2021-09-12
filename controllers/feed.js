const fs = require("fs");
const path = require("path");

exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;

  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetch Posts Successfully",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could Not find Post..");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ message: "Post fetched", post: post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Enterd Data is incorrect");
    return res.status(402).json({
      message: error,
      errors: errors.array(),
    });
  }
  const title = req.body.title;
  const content = req.body.content;

  if (!req.file) {
    const error = new Error("No image Provided");
    error.statusCode = 422;
    throw error;
  }
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "./images/" + req.file.filename,
    creator: req.userId,
    createdAt: new Date(),
  });

  post
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.push(post._id);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Post Created Successfully",
        post: {
          _id: post._id,

          createdAt: new Date(),
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePosts = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Enterd Data is incorrect");
    return res.status(402).json({
      message: error,
      errors: errors.array(),
    });
  }
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  let imagename;
  if (req.file) {
    imageUrl = req.file.path;
    imagename = req.file.filename;
  }

  if (!imageUrl) {
    const error = new Error("NO file Picked");
    error.statusCode = 422;
    throw error;
  }

  Post.findById(postId)

    .then((post) => {
      if (!post) {
        const error = new Error("NO Posts");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId.toString()) {
        const error = new Error("Authorization Failed");
        error.statusCode = 403;
        throw error;
      }

      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }
      if (!imagename) {
        console.log(imageUrl.substr(9));
        imagename = imageUrl.substr(9);
      }
      post.title = title;
      post.imageUrl = "./images/" + imagename;
      post.content = content;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Post Updated",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("NO Posts");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId.toString()) {
        const error = new Error("Authorization Failed");
        error.statusCode = 403;
        throw error;
      }
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      return user.save();
    })
    .then((resultf) => {
      console.log("Deleted...!!!");
      res.status(200).json({
        message: "Deleted Post",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  console.log("Clear Image....!!!");

  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
