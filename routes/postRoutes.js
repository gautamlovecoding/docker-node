const express = require("express");
const {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getOnePost).patch(updatePost).delete(deletePost);

module.exports = router;
