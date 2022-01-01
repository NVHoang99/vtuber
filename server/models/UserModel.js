import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            allowNull: true,
        },
        email: {
            type: String,
            allowNull: true,
        },
        googleId: {
            type: String,
            allowNull: true,
        },
        facebookId: {
            type: String,
            allowNull: true,
        },
        avatar: {
            type: String,
            allowNull: true,
        },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model('User', schema);
