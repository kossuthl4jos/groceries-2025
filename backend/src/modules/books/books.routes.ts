import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "./books.controller";

const router = Router();

// /books
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);

export default router;
