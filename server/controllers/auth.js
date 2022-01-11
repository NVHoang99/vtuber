import { UserModel } from '../models/UserModel.js';
import { OAuth2Client } from 'google-auth-library';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const client = new OAuth2Client(process.env.CLIENT_ID);

export const googlelogin = (req, res) => {
    client
        .verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID,
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
                            res.cookie('token', req.body.token, {
                                maxAge: 3 * 24 * 60 * 60 * 1000,
                                httpOnly: false,
                            });
                            // const token = jwt.sign(
                            //     { _id: user._id },
                            //     '' + process.env.JWT_SIGNIN_KEY,
                            //     { expiresIn: '7d' }
                            // );
                            const { _id, fullName, email, avatar } = user;

                            res.json({
                                _id,
                                fullName,
                                email,
                                avatar,
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
                                        error: 'Something went wrong when save to mongodb...',
                                    });
                                }

                                res.cookie('token', req.body.token, {
                                    maxAge: 3 * 24 * 60 * 60 * 1000,
                                    httpOnly: false,
                                });
                                const { _id, fullName, email, avatar } =
                                    newUser;
                                res.json({ _id, fullName, email, avatar });
                                // const token = jwt.sign(
                                //     { _id: data._id },
                                //     '' + process.env.JWT_SIGNIN_KEY,
                                //     { expiresIn: '7d' }
                                // );
                            });
                        }
                    }
                });
            }
        });
};

export const checkAuthenticated = (req, res, next) => {
    let token = req.cookies['token'];

    client
        .verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        })
        .then((response) => {
            const { email_verified, email } = response.payload;
            if (email_verified) {
                UserModel.findOne({ email }).exec((err, user) => {
                    if (err) {
                        return res
                            .status(400)
                            .json({ error: 'Something went wrong...' });
                    } else {
                        if (user) {
                            const { _id, fullName, email, avatar } = user;

                            req.user = { _id, fullName, email, avatar };
                            next();
                        }
                    }
                });
            }
        })
        .catch((err) => {
            res.json(null);
        });
};

export const getUserByToken = (req, res) => {
    let user = req.user;
    res.json(user);
};

export const getUserById = async (req, res) => {
    const params = req.params;

    try {
        let user = await UserModel.findOne({ _id: params.userId });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};
