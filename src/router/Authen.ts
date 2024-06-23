import { Router } from "express";
import { authen, getListAuth } from "../controller/Auth";

export const router = Router();

router.post("/", authen);
router.get("/", getListAuth);
