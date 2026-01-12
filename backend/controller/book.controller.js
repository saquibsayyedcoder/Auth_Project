import Book from "../model/book.model.js";
import fs from "fs";
import path from "path";


export const createBook = async (req, res) => {
    try {
        const {title, author, description, price, stock} = req.body;

        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const book = await Book.create({
      title,
      author,
      price,
      stock,
      description,
      image,
        });

        res.status(201).json({
            message:"Book Added Sucessfully",
            book
        });
        
    } catch (error) {
         console.error("something went wrong", error);
        res.status(500).json({
            message: error.message
        });
        
    }
}

//Get All Books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
};

//Get a Single book

export const getSingleBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book){
            return res.status(404).json({
                message:"Book Not Found"
            });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
};

//Update Book 

export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        //1. pehel book niaklo
        const book =  await Book.findById(bookId);
        if(!book){
            return res.status(404).json({
                message:"Book not Found"
            });
        }
        //2. Aagar new img sayi hai
        if(req.file){
            //purani image delte karo
            if(book.image){
                const odlImagePath = path.join(process.cwd(), book.image);
                if(fs.existsSysc(odlImagePath)){
                    fs.unlinkSync(odlImagePath);
                }
            }
              //new image path set karo
        req.body.image = `/uploads/$(req.file.filename)`;
        }

        //3. Book updated
        const updateBook = await Book.findByIdAndUpdate(
            bookId,
            req.body,
            {new: true}
        );
        res.json({
            message: "Book Updated Successfully",
            book: updatedBook,
        });
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}

//Delete Book

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({
                message:"Book Not Found"
            });
        }
        //Image delete karo
        if(book.image){
            const imagePath = path.join(process.cwd(), book.image);
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath);
            }
        }

        //book delete
        await Book.findByIdAndDelete(req.params.id);

        res.json({
            message:"Book Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({message:error.message});
        
    };
}