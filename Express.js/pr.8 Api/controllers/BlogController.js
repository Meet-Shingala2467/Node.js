const BlogModel = require('../models/BlogModel');
const fs = require('fs');
const createBlog = async (req, res) => {
    try {
        const userid = req.user?._id;
        const { title, content } = req.body;
        let blog = await BlogModel.create({
            userId: userid,
            title: title,
            content: content,
            blogimage: req.file.path
        })
        return res.status(200).send({
            success: true,
            message: 'blog successfully create',
            blog
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const viewBlog = async (req, res) => {
    try {
        let blogs = await BlogModel.find({ userId: req.user?._id }).populate('userId');
        return res.status(200).send({
            success: true,
            length: blogs.length,
            message: 'blog successfully fetch',
            blogs
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const deleteBlog = async (req, res) => {
    try {
        let blogid = req.query.blogid;
        let oldrecord = await BlogModel.findById(blogid);
        await fs.unlinkSync(oldrecord?.blogimage)
        await BlogModel.findByIdAndDelete(blogid);
        return res.status(200).send({
            success: true,
            message: 'blog successfully delete',
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const updateBlog = async (req, res) => {
    try {
        let blogid = req.body.blogid;
        let userid = req.user?._id;
        if (req.file) {
            let oldrecord = await BlogModel.findById(blogid);
            await fs.unlinkSync(oldrecord?.blogimage);
            await BlogModel.findByIdAndUpdate(blogid, {
                userId: userid,
                title: req.body.title,
                content: req.body.content,
                blogimage: req.file.path
            })
            return res.status(200).send({
                success: true,
                message: 'blog successfully update',
            })

        } else {
            let oldrecord = await BlogModel.findById(blogid);
            await BlogModel.findByIdAndUpdate(blogid, {
                userId: userid,
                title: req.body.title,
                content: req.body.content,
                blogimage: oldrecord.blogimage
            })
            return res.status(200).send({
                success: true,
                message: 'blog successfully update',
            })
        }
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    createBlog, viewBlog, deleteBlog, updateBlog
}