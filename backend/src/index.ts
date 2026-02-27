import "dotenv/config";
import express, { Request, Response } from "express";
import { Db, ObjectId, WithId } from "mongodb";
import { connectToDatabase } from "./db/db";
import { Book } from "./modules/books/books.type";

const port = process.env.SERVER_PORT;
const app = express();
app.use(express.json());

connectToDatabase()
  .then((db: Db) => {
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });

    app.locals.db = db;
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
    process.exit(1);
  });

//routes
app.get("/lists", async (req: Request, res: Response) => {
  try {
    const db: Db = req.app.locals.db;

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;
    const skip = (page - 1) * pageSize;

    const lists = await db
      .collection("lists")
      .find()
      .sort({ author: 1 })
      .skip(skip)
      .limit(pageSize)
      .toArray();

    res.status(200).json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
});

app.get("/lists/:id", async (req: Request, res: Response) => {
  const listId = req.params.id as string;

  if (!ObjectId.isValid(listId)) {
    return res.status(400).json({ error: "Invalid list ID" });
  }

  try {
    const db: Db = req.app.locals.db;
    const doc = await db
      .collection("lists")
      .findOne({ _id: new ObjectId(listId) });

    if (!doc) {
      return res.status(404).json({ error: "List not found" });
    }

    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch the document" });
  }
});

app.post("/lists", async (req: Request, res: Response) => {
  const list = req.body;

  try {
    const db: Db = req.app.locals.db;
    const result = await db.collection("lists").insertOne(list);
    res.status(201).json({ _id: result.insertedId, ...list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create a new document" });
  }
});

app.delete("/lists/:id", async (req: Request, res: Response) => {
  const listId = req.params.id as string;

  if (!ObjectId.isValid(listId)) {
    return res.status(400).json({ error: "Invalid list ID" });
  }

  try {
    const db: Db = req.app.locals.db;
    const result = await db
      .collection("lists")
      .deleteOne({ _id: new ObjectId(listId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "List not found" });
    }

    res.status(200).json({ message: "List deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete the document" });
  }
});

app.patch("/lists/:id", async (req: Request, res: Response) => {
  const listId = req.params.id as string;
  const updatedFields = req.body;

  if (!ObjectId.isValid(listId)) {
    return res.status(400).json({ error: "Invalid list ID" });
  }

  try {
    const db: Db = req.app.locals.db;
    const result = await db
      .collection("lists")
      .updateOne({ _id: new ObjectId(listId) }, { $set: updatedFields });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "List not found" });
    }

    res.status(200).json({ message: "List updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update the document" });
  }
});

//old tutorial routes
app.get("/books", async (req: Request, res: Response) => {
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

// GET /books/:id
app.get("/books/:id", async (req: Request, res: Response) => {
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

// POST /books
app.post("/books", async (req: Request, res: Response) => {
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

// DELETE /books/:id
app.delete("/books/:id", async (req: Request, res: Response) => {
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

app.patch("/books/:id", async (req: Request, res: Response) => {
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
