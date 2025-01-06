import express from 'express';
import { mongoDBURL, PORT } from './config.js';
import mongoose from 'mongoose';
import booksRouter from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/books", booksRouter);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Your app is running on http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB: ", err);
    })