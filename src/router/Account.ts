import { Router } from "express";
import { createAccount, deleteAccount, getAccount, getListAccount, updateAccount } from "../controller/Account";

export const router = Router();

router.get("/:id", getAccount);
router.get("/", getListAccount);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);