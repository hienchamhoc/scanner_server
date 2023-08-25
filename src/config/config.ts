import {Router} from "express";
import {router} from "../router";
import bodyParser from "body-parser";
import cors from "cors";

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    exposedHeaders: 'token'
};

export async function config(app: Router) {
    await app.use(cors(corsOptions));
    await app.use(bodyParser.json());
    await app.use('/api', router);
}
