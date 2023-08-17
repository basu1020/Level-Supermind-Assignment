const Blog = require('../models/blogModel');
// ...

// Define blog-related controller methods here
const { body, validationResult } = require('express-validator')

const newBlogValidator = [
    body('imageSrc').isURL().withMessage(),
    body('title').isLength({max: 100, min: 10}).withMessage("title should me minimum of 10 and maximum of 100 characters"),
    body('content').isLength({max: 1000, min: 10}).withMessage("content should me minimum of 10 and maximum of 1000 characters"),
]

const newBlogCreator = async (req, res) => {
    try{
        // checking for any validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // creating a new blog
        const newBlog = await Blog.create({imageSrc: req.body.imageSrc, title: req.body.title, content: req.body.content, userId: req.userId, createdBy: req.username })
        
        // sending the newly created blog 
        res.status(201).json({success: true, newBlog})
    }catch(error) {
        res.status(500).json({message: error.message})
    }
}

const blogIdValidator = [
    body('blogId').notEmpty().withMessage('Blog ID must be provided')
]

const blogUserIdValidator = [
    body('userId').notEmpty().withMessage('User ID must be provided')
]

const blogUpdater = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // updating the blog
        const [updateCount] = await Blog.update({
            imageSrc: req.body.imageSrc,
            title: req.body.title,
            content: req.body.content
        }, {where: {
            id: req.body.blogId,
            userId: req.userId
        }})

        // Check if any blog was updated
        if (updateCount === 0) {
            return res.status(404).json({ message: 'Blog not found or not authorized to update' });
        }


        // fetching it again in order to send it
        const updatedBlog = await Blog.findOne({
            where: {
                id: req.body.blogId
        }})
        
        // sending the response
        res.status(200).json({success: true, updatedBlog})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

const getBlogsofUser = async(req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const blogsByUser = await Blog.findAll({
            where: {
                userId: req.body.userId
            }
        })

        res.status(200).json({success: true, blogsByUser})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const blogDeleter = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const deletedBlogCount = await Blog.destroy({
            where: {
                id: req.body.blogId,
                userId: req.userId
            }
        })

        if(deletedBlogCount === 0) {
            return res.status(404).json({
                message: 'Blog not found or not authorized to delete'
            })
        }
        res.status(204).json({success:true, message:"deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const fetchAllBlogs = async (req, res) => {
    try{
        const allBlogs = await Blog.findAll()

        res.status(200).json({success: true, allBlogs})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    newBlogValidator, newBlogCreator, blogUpdater, blogIdValidator, blogUserIdValidator, blogDeleter, getBlogsofUser, fetchAllBlogs
}