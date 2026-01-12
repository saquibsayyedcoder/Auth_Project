import express from "express";
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from "../controller/book.controller.js";
import protect from "../middleware/auth.middlleware.js";
import upload from "../middleware/upload.middleware.js";



const router = express.Router();

router.post("/create", protect, upload.single("image"), createBook);
router.get("/all-books", getAllBooks);
router.get("/get-single-book/:id", getSingleBook);
router.put("/update/:id",upload.single("image"), updateBook);
router.delete("/delete/:id", protect, deleteBook);

export default router;
