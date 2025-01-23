const PostModel = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new PostModel({ title, body });
    await post.save();
    res.status(201).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating post" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: { posts },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};

const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const post = await PostModel.findByIdAndUpdate(
      id,
      { title, body },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting post" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
};
