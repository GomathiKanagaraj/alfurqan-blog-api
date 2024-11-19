const Blog = require('../models/blogModel');

// Add a new blog
const addBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            return res.status(400).json({ error: 'Title, content, and author are required' });
        }

        const newBlog = new Blog({ title, content, author });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add blog' });
    }
};

// List all blogs
const listBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to list blogs' });
    }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update blog' });
    }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json(deletedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete blog' });
    }
};

module.exports = { addBlog, listBlogs, updateBlog, deleteBlog };
