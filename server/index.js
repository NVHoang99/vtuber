import express from 'express';
import cors from 'cors';
import posts from './routers/posts.js';
import auth from './routers/auth.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;
const URI =
    'mongodb+srv://admin:hoangkk99@cluster0.8uoca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use('/posts', posts);

app.use('/auth', auth);

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to DB');

        app.listen(PORT, () => {
            console.log('listening on port', PORT);
        });
    })
    .catch((err) => console.log(err));
