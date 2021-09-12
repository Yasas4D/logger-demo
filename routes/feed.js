const express = require("express");
const feedController = require("../controllers/feed");
const router = express.Router();
const isauth = require("../middleware/is-auth");

router.get("/posts", isauth, feedController.getPosts);

router.post("/posts", isauth, feedController.createPost);
router.get("/post/:postId", isauth, feedController.getPost);

router.put("/post/:postId", isauth, feedController.updatePosts);

router.delete("/post/:postId", isauth, feedController.deletePost);

module.exports = router;
