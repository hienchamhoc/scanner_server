import { Router } from "express";
import { router } from "../router";
import bodyParser from "body-parser";
import cors from "cors";
import { Account } from "../database/model/Account";
import { Authentication } from "../database/model/Authentication";
import { Machine } from "../database/model/Machine";
import { User } from "../database/model/User";

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    exposedHeaders: 'token'
};

export async function config(app: Router) {
    await createDatabase();
    await app.use(cors(corsOptions));
    await app.use(bodyParser.json());
    await app.use('/api', router);
}

async function createDatabase() {
    await Account.sync({ alter: true });
    await Authentication.sync({ alter: true });
    await Machine.sync({ alter: true });
    await User.sync({ alter: true });
}
