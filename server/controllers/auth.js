import { UserModel } from '../models/UserModel.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_API_TOKEN);

export const googlelogin = (req, res) => {
    const { payload } = req.body;

    client
        .verifyIdToken({
            idToken: payload.token,
            audience: process.env.REACT_APP_GOOGLE_API_TOKEN,
        })
        .then((response) => {
            const { email_verified, name, email, picture, sub } =
                response.payload;

            if (email_verified) {
                UserModel.findOne({ email }).exec((err, user) => {
                    if (err) {
                        return res
                            .status(400)
                            .json({ error: 'Something went wrong...' });
                    } else {
                        if (user) {
                            const token = jwt.sign(
                                { _id: user._id },
                                process.env.JWT_SIGNIN_KEY,
                                { expiresIn: '7d' }
                            );
                            const { _id, fullName, email, picture } = user;
                            res.json({
                                token,
                                user: { _id, fullName, email, picture },
                            });
                        } else {
                            let newUser = new UserModel({
                                fullName: name,
                                email: email,
                                googleId: sub,
                                facebookId: null,
                                avatar: picture,
                            });

                            newUser.save((err, data) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: 'Something went wrong...',
                                    });
                                }
                                const token = jwt.sign(
                                    { _id: data._id },
                                    '' + process.env.JWT_SIGNIN_KEY,
                                    { expiresIn: '7d' }
                                );
                                const { _id, fullName, email, picture } =
                                    newUser;
                                res.json({
                                    token,
                                    user: { _id, fullName, email, picture },
                                });
                            });
                        }
                    }
                });
            }
        });
};
