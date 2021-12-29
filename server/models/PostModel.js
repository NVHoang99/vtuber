import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        author: {
            type: String,
            required: true,
        },
        attachments: String,
        likeCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const PostModel = mongoose.model("Post", schema);
