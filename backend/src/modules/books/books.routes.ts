import { Request, Response, Router } from "express";
import { Db, ObjectId, WithId } from "mongodb";
import { Book } from "./books.type";

const router = Router();

router.get("/books", async (req: Request, res: Response) => {
  try {
    const db: Db = req.app.locals.db;

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const skip = (page - 1) * pageSize;

    const books: WithId<Book>[] = await db
      .collection<Book>("books")
      .find()
      .sort({ author: 1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
});

router.get("/books/:id", async (req: Request, res: Response) => {
  const bookId = req.params.id as string;

  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  try {
    const db: Db = req.app.locals.db;

    const book = await db
      .collection<Book>("books")
      .findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch the document" });
  }
});

router.post("/books", async (req: Request, res: Response) => {
  const book: Book = req.body;

  try {
    const db: Db = req.app.locals.db;

    const result = await db.collection<Book>("books").insertOne(book);
    res.status(201).json({ _id: result.insertedId, ...book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create a new document" });
  }
});

router.delete("/books/:id", async (req: Request, res: Response) => {
  const bookId = req.params.id as string;

  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  try {
    const db: Db = req.app.locals.db;

    const result = await db
      .collection<Book>("books")
      .deleteOne({ _id: new ObjectId(bookId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete the document" });
  }
});

router.patch("/books/:id", async (req: Request, res: Response) => {
  const bookId = req.params.id as string;
  const updatedFields: Partial<Book> = req.body;

  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  try {
    const db: Db = req.app.locals.db;

    const result = await db
      .collection<Book>("books")
      .updateOne({ _id: new ObjectId(bookId) }, { $set: updatedFields });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update the document" });
  }
});

export default router;
