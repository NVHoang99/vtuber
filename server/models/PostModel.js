import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
        },
        attachments: String,
        destination: String,
        likeCount: {
            type: Number,
            default: 0,
        },
        tag: {
            type: Array,
        },
        category: {
            type: String,
        },
        savedBy: {
            type: Array,
            default: [],
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

export const PostModel = mongoose.model('Post', schema);
