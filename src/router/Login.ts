import { Router } from "express";
import { login } from "../controller/Login";

export const router = Router();

router.post("/", login);
