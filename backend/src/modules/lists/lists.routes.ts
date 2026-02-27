// import { Router } from "express";
// import { getUsers, getUser } from "./users.controller";

// const router = Router();

// router.get("/", getUsers);
// router.get("/:id", getUser);

// export default router;

import { Router } from "express";
import {
  createList,
  deleteList,
  getListById,
  getLists,
  updateList,
} from "./lists.controller";

const router = Router();

// /lists
router.get("/", getLists);
router.get("/:id", getListById);
router.post("/", createList);
router.delete("/:id", deleteList);
router.patch("/:id", updateList);

export default router;
