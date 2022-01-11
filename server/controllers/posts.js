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

export const getPostDetail = async (req, res) => {
    const url = req.url;
    const pinId = url.slice(8);

    try {
        let post = await PostModel.findOne({ _id: pinId });
        let user = await UserModel.findOne({ _id: post.author });
        res.status(200).json({ post, authorInfo: user });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const addComment = async (req, res) => {
    try {
        const { pinId, comment, user } = req.body;
        const post = await PostModel.findOneAndUpdate(
            { _id: pinId },
            {
                $addToSet: {
                    comments: [
                        {
                            comment,
                            postedBy: {
                                userId: user._id,
                                avatar: user.avatar,
                                fullName: user.fullName,
                            },
                        },
                    ],
                },
            },
            { new: true }
        );
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getCreatedPost = async (req, res) => {
    const params = req.params;

    try {
        let posts = await PostModel.find({ author: params.userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getSavedPost = async (req, res) => {
    const params = req.params;

    try {
        let posts = await PostModel.find({ savedBy: params.userId });
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error });
    }
};
