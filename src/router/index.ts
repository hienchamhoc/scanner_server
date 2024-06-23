import express, { Router } from "express";

import { router as routerAccount } from "./Account";
import { router as routerMachine } from "./Machine";
import { router as routerUser } from "./User";
import { router as routerLogin } from "./Login";
import { router as routerAuth } from "./Authen";

export const router = Router();

router.use("/account", routerAccount);
router.use("/machine", routerMachine);
router.use("/user", routerUser);
router.use("/login", routerLogin);
router.use("/auth", routerAuth);


