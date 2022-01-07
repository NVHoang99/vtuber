import { PostModel } from '../models/PostModel.js';
import { UserModel } from '../models/UserModel.js';
import mongo from 'mongodb';

export const getPosts = async (req, res) => {
    const pathname = req.url;

    let posts = [],
        data = [];

    try {
        if (pathname.includes('images')) {
            posts = await PostModel.find({ category: 'image' });

            const users = posts.map((post) =>
                UserModel.findOne({ _id: post.author })
            );

            const items = await Promise.all(users);

            items.forEach((item, index) =>
                data.push({ post: posts[index], authorInfo: item })
            );
            res.status(200).json(data);
        } else {
            posts = await PostModel.find({ category: 'video' });

            const users = posts.map((post) =>
                UserModel.findOne({ _id: post.author })
            );

            const items = await Promise.all(users);

            items.forEach((item, index) =>
                data.push({ post: posts[index], authorInfo: item })
            );
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const createPost = async (req, res) => {
    try {
        const newPost = req.body;
        const post = new PostModel(newPost);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updatePost = async (req, res) => {
    try {
        const updatePost = req.body;
        const post = await PostModel.findOneAndUpdate(
            { _id: updatePost._id },
            updatePost,
            { new: true }
        );
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const savePost = async (req, res) => {
    try {
        const { post, user } = req.body;
        const newpost = await PostModel.findOneAndUpdate(
            { _id: new mongo.ObjectId(post) },
            { $addToSet: { savedBy: [new mongo.ObjectId(user)] } },
            { new: true }
        );
        await newpost.save();
        res.status(200).json(newpost);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const unSavePost = async (req, res) => {
    try {
        const { post, user } = req.body;

        const newpost = await PostModel.findOneAndUpdate(
            { _id: new mongo.ObjectId(post) },
            { $pull: { savedBy: new mongo.ObjectId(user) } },
            { new: true }
        );

        await newpost.save();
        res.status(200).json(newpost);
    } catch (error) {
        res.status(500).json({ error });
    }
};
