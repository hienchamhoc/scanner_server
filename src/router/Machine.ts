import { Router } from "express";
import { getListMachine, getMachine, createMachine, updateMachine, deleteMachine } from "../controller/Machine";

export const router = Router();

router.get("/:id", getMachine);
router.get("/", getListMachine);
router.post("/", createMachine);
router.put("/:id", updateMachine);
router.delete("/:id", deleteMachine);