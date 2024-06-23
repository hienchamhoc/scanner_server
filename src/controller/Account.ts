import { Request, Response } from "express";
import { ROLE, STATE } from "../database/enum/enum";
import { Account } from "../database/model/Account";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";


async function getAccount(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const account = await Account.findOne({
            where: {
                id: id,
                state: [STATE.ACTIVE]
            }
        })
        if (!account) {
            res.status(404);
            throw new Error("Id does not exist");

        }
        res.status(200).json({ account });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not find account",
            error: <Error>err.message,
        });
    }
}

async function getListAccount(req: Request, res: Response) {
    try {
        const accounts = await Account.findAll({
            where: {
                state: [STATE.ACTIVE, STATE.INACTIVE]
            }
        })
        res.status(200).json({ accounts });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not find account",
            error: <Error>err.message,
        });
    }
}

async function createAccount(req: Request, res: Response) {
    try {
        const reqAccount: Account = req.body;
        if (!reqAccount.name || !reqAccount.username || !reqAccount.password || !reqAccount.phone || !reqAccount.role || !reqAccount.state) {
            res.status(422);
            throw new Error("Missing data body");
        }
        const existAccount = await Account.findOne({
            where: {
                [Op.or]: [{
                    username: reqAccount.username
                }, {
                    phone: reqAccount.phone
                }]
            }
        })
        if (existAccount) {
            res.status(400);
            throw new Error("Username or phone does exist")
        }
        const account = await Account.create({
            id: uuid(),
            name: reqAccount.name,
            username: reqAccount.username,
            password: reqAccount.password,
            phone: reqAccount.phone,
            email: reqAccount.email,
            role: reqAccount.role,
            state: reqAccount.state,
            option: reqAccount.option,
        })
        res.status(200).json({ account });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not create account",
            error: <Error>err.message,
        });
    }
}

async function updateAccount(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const reqAccount: Account = req.body;
        if (!reqAccount.name || !reqAccount.username || !reqAccount.password || !reqAccount.phone || !reqAccount.role || !reqAccount.state) {
            res.status(422);
            throw new Error("Missing data body");
        }
        const account = await Account.findOne({
            where: {
                id: id
            }
        })
        if (!account) {
            res.status(404);
            throw new Error("Id does not exist")
        }
        const existAccount = await Account.findOne({
            where: {
                [Op.and]: [{
                    [Op.or]: [{
                        username: reqAccount.username
                    }, {
                        phone: reqAccount.phone
                    }]
                }, {
                    id: { [Op.ne]: id }
                }]
            }

        })
        if (existAccount) {
            res.status(400);
            throw new Error("Username or phone does exist")
        }
        account.set({
            id: uuid(),
            name: reqAccount.name,
            username: reqAccount.username,
            password: reqAccount.password,
            phone: reqAccount.phone,
            email: reqAccount.email,
            role: reqAccount.role,
            state: reqAccount.state,
            option: reqAccount.option,
        })
        await account.save();
        res.status(200).json({ account });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not update account",
            error: <Error>err.message,
        });
    }
}

async function deleteAccount(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const account = await Account.findOne({
            where: {
                id: id,
            }
        })
        if (!account) {
            res.status(404);
            throw new Error("Id does not exist")
        }
        account.set({
            state: STATE.DELETED,
        })
        await account.save();
        res.status(200).json({ message: "Delete successfully" });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not delete account",
            error: <Error>err.message,
        });
    }
}

export {
    getAccount,
    getListAccount,
    createAccount,
    updateAccount,
    deleteAccount,
}