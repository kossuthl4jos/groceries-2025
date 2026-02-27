import cors from "cors";
import "dotenv/config";
import express from "express";
import { Db } from "mongodb";
import { connectToDatabase } from "./db/db";
import booksRoutes from "./modules/books/books.routes";
import listsRoutes from "./modules/lists/lists.routes";

const port = process.env.SERVER_PORT;
const localFEOrigin = process.env.LOCAL_FE_ORIGIN;
const app = express();
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: localFEOrigin,
  }),
);

connectToDatabase()
  .then((db: Db) => {
    app.listen(port, () => {
      console.log(
        `server started at http://localhost:${port} with CORS enabled for ${localFEOrigin}`,
      );
    });

    app.locals.db = db;
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
    process.exit(1);
  });

// routes
app.use("/lists", listsRoutes);
app.use("/books", booksRoutes);
