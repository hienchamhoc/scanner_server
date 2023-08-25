import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import {config} from "./config/config";

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

config(app).then(() => {
    console.log("Config successfully.")
});

app.get('/', (req: Request, res: Response) => {
    res.send('Tinggg!');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

