import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route to ceate a new book
router.post("/", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if(!title || !author || !publishYear){
            return res.status(400).send({
                message: "All fields are required: author, title, publish Year"
            });
        }
        const newBook = {
            title: title,
            author: author,
            publishYear: publishYear
        }
        const book = await Book.create(newBook);    

        return res.status(201).send(book);
    } catch (error) {
            console.log(error.message);
            res.status(500).send({message: error.message});
    }
});

//Route to get all books from the database
router.get("/", async (req, res) => {
    try{
        const books = await Book.find({});
        res.status(200).json({
            count: books.length,
            data: books
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

//Route to get a book by id
router.get("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).send({message: "Book not found"});
        }
        res.status(200).json(book);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

//Route to update a book
router.put("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const { title, author, publishYear } = req.body;
        if(!title || !author || !publishYear){
            return res.status(400).send({message: "All fields are required: title, author, publish Year"});
        }

        const updatedUser = {
            title: title,
            author: author,
            publishYear: publishYear
        }

        const result = await Book.findByIdAndUpdate(id, updatedUser, {new: true});
        res.status(200).json(result);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
    
});

//Route to delete a book
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({message: "Book not found"});
        }
        return res.status(200).send({message: "Book deleted successfully"});
    } catch (error) {
        console.log(error.message);
        res.send(500).send({message: error.message});
    }
});

export default router;