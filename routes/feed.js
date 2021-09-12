const express = require("express");
const feedController = require("../controllers/feed");
const router = express.Router();
const isauth = require("../middleware/is-auth");
const { body } = require("express-validator");

router.get(
  "/posts",
  isauth,
  feedController.getPosts
);

router.post(
  "/posts",
  isauth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);
router.get("/post/:postId", isauth, feedController.getPost);

router.put(
  "/post/:postId",
  isauth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePosts
);

router.delete("/post/:postId", isauth, feedController.deletePost);

module.exports = router;
