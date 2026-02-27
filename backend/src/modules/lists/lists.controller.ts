import { Request, Response } from "express";
import { Db, ObjectId } from "mongodb";

// TODO add service layer like so:
// import { Request, Response } from "express";
// import * as usersService from "./users.service";

// export async function getUsers(req: Request, res: Response) {
//   const users = await usersService.listUsers();
//   res.json(users);
// }

// export async function getUser(req: Request, res: Response) {
//   const user = await usersService.getUserById(req.params.id);
//   res.json(user);
// }

export async function getLists(req: Request, res: Response) {
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
}

export async function getListById(req: Request, res: Response) {
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
}

export async function createList(req: Request, res: Response) {
  const list = req.body;

  try {
    const db: Db = req.app.locals.db;
    const result = await db.collection("lists").insertOne(list);
    res.status(201).json({ _id: result.insertedId, ...list });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create a new document" });
  }
}

export async function updateList(req: Request, res: Response) {
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
}

export async function deleteList(req: Request, res: Response) {
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
}
