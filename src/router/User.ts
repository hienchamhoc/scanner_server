import { Router } from "express";
import { createUser, getListUser, getUser, updateUser, deleteUser } from "../controller/User";

export const router = Router();

router.get("/:id", getUser);
router.get("/", getListUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);