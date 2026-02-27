const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDataBase, getDataBase } = require("./db");

const port = process.env.SERVER_PORT;
const app = express();
app.use(express.json());

let db;
connectToDataBase((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });

    db = getDataBase();
  }
});

//routes
app.get("/lists", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const skip = (page - 1) * pageSize;

  let books = [];
  db.collection("lists")
    .find()
    .sort({ author: 1 })
    .skip(skip)
    .limit(pageSize)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/lists/:id", (req, res) => {
  const listId = req.params.id;

  if (ObjectId.isValid(listId) === false) {
    res.status(400).json({ error: "Invalid list ID" });
    return;
  }

  db.collection("lists")
    .findOne({ _id: new ObjectId(listId) })
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "List not found" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the document" });
    });
});

app.post("/lists", (req, res) => {
  const list = req.body;
  db.collection("lists")
    .insertOne(list)
    .then((result) => {
      res.status(201).json({ _id: result.insertedId, ...list });
    })
    .catch(() => {
      res.status(500).json({ error: "Could not create a new document" });
    });
});

app.delete("/lists/:id", (req, res) => {
  const listId = req.params.id;
  if (ObjectId.isValid(listId) === false) {
    res.status(400).json({ error: "Invalid list ID" });
    return;
  }
  db.collection("lists")
    .deleteOne({ _id: new ObjectId(listId) })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({ error: "List not found" });
      } else {
        res.status(200).json({ message: "List deleted successfully" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Could not delete the document" });
    });
});

app.patch("/lists/:id", (req, res) => {
  const listId = req.params.id;
  const updatedFields = req.body;
  if (ObjectId.isValid(listId) === false) {
    res.status(400).json({ error: "Invalid list ID" });
    return;
  }
  db.collection("lists")
    .updateOne({ _id: new ObjectId(listId) }, { $set: updatedFields })
    .then((result) => {
      if (result.matchedCount === 0) {
        res.status(404).json({ error: "List not found" });
      } else {
        res.status(200).json({ message: "List updated successfully" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Could not update the document" });
    });
});

//old tutorial routes
app.get("/books", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;
  const skip = (page - 1) * pageSize;

  let books = [];
  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(skip)
    .limit(pageSize)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;

  if (ObjectId.isValid(bookId) === false) {
    res.status(400).json({ error: "Invalid book ID" });
    return;
  }

  db.collection("books")
    .findOne({ _id: new ObjectId(bookId) })
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the document" });
    });
});

app.post("/books", (req, res) => {
  const book = req.body;
  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json({ _id: result.insertedId, ...book });
    })
    .catch(() => {
      res.status(500).json({ error: "Could not create a new document" });
    });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  if (ObjectId.isValid(bookId) === false) {
    res.status(400).json({ error: "Invalid book ID" });
    return;
  }
  db.collection("books")
    .deleteOne({ _id: new ObjectId(bookId) })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Book not found" });
      } else {
        res.status(200).json({ message: "Book deleted successfully" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Could not delete the document" });
    });
});

app.patch("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const updatedFields = req.body;
  if (ObjectId.isValid(bookId) === false) {
    res.status(400).json({ error: "Invalid book ID" });
    return;
  }
  db.collection("books")
    .updateOne({ _id: new ObjectId(bookId) }, { $set: updatedFields })
    .then((result) => {
      if (result.matchedCount === 0) {
        res.status(404).json({ error: "Book not found" });
      } else {
        res.status(200).json({ message: "Book updated successfully" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Could not update the document" });
    });
});
