import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";
import { Account } from "../database/model/Account";
import { STATE } from "../database/enum/enum";

async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(422);
            throw new Error("Username or password is null");
        }
        const account = await Account.findOne({
            where: {
                username: username,
                password: password,
                state: STATE.ACTIVE
            }
        })
        if (!account) {
            res.status(404);
            throw new Error("Username or password is incorrect");
        }
        res.status(200).json({ account });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not login",
            error: <Error>err.message,
        });
    }
}
export {
    login
}