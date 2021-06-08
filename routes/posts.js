const express = require('express');
const PostModel = require('../models/PostModel');

const router = express.Router();

// Get All the posts
router.get('/', async (req, res) => {
  try {
    const posts = await PostModel.find();
    if (posts.length < 1) {
      return res.json({ message: 'The post collection is empty' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Get a specific post
router.get('/:postId', async (req, res) => {
  try {
    const post = await PostModel.find({ _id: req.params.postId });

    if (post.length < 1) {
      return res.status(200).json({ message: "The post doesn't exist" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: "couldn't get the post!! please provide a valid postId" });
  }
});

// Submit a post
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  const post = new PostModel({
    title,
    description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Delete a post
router.delete('/:postId', async (req, res) => {
  try {
    await PostModel.deleteOne({ _id: req.params.postId });
    res.status(200).json({ message: 'post deleted' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a post
router.patch('/:postId', async (req, res) => {
  try {
    await PostModel.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } });
    res.json({ message: 'post successfully updated' });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
