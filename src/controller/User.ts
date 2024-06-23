import { Request, Response } from "express";
import { ROLE, STATE } from "../database/enum/enum";
import { User } from "../database/model/User";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";

async function getUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id: id,
                state: [STATE.ACTIVE, STATE.INACTIVE]
            }
        })
        if (!user) {
            res.status(404);
            throw new Error("Id does not exist");

        }
        res.status(200).json({ user });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not find user",
            error: <Error>err.message,
        });
    }
}

async function getListUser(req: Request, res: Response) {
    try {
        const users = await User.findAll({
            where: {
                state: [STATE.ACTIVE, STATE.INACTIVE]
            }
        })
        res.status(200).json({ users });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not find user",
            error: <Error>err.message,
        });
    }
}

async function createUser(req: Request, res: Response) {
    try {
        const reqUser: User = req.body;
        console.log(reqUser);

        if (!reqUser.name || !reqUser.phone || !reqUser.gender || !reqUser.state) {
            res.status(422);
            throw new Error("Missing data body");
        }
        const existUser = await User.findOne({
            where: {
                phone: reqUser.phone
            }
        })
        if (existUser) {
            res.status(400);
            throw new Error("Phone does exist")
        }
        const user = await User.create({
            id: uuid(),
            name: reqUser.name,
            birthday: reqUser.birthday,
            gender: reqUser.gender,
            phone: reqUser.phone,
            email: reqUser.email,
            state: reqUser.state,
            option: reqUser.option,
        })
        res.status(200).json({ user });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not create user",
            error: <Error>err.message,
        });
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const reqUser: User = req.body;
        if (!reqUser.name || !reqUser.gender || !reqUser.state) {
            res.status(422);
            throw new Error("Missing data body");
        }
        const user = await User.findOne({
            where: {
                id: id
            }
        })
        if (!user) {
            res.status(404);
            throw new Error("Id does not exist")
        }
        if (reqUser.phone) {
            const existUser = await User.findOne({
                where: {
                    [Op.and]: [
                        {
                            phone: reqUser.phone
                        },
                        {
                            id: { [Op.ne]: id }
                        }
                    ]
                }
            })
            if (existUser) {
                res.status(400);
                throw new Error("Phone does exist")
            }
        }
        user.set({
            id: uuid(),
            name: reqUser.name,
            birthday: reqUser.birthday,
            gender: reqUser.gender,
            phone: reqUser.phone,
            email: reqUser.email,
            state: reqUser.state,
            option: reqUser.option,
        })
        await user.save();
        res.status(200).json({ user });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not update user",
            error: <Error>err.message,
        });
    }
}

async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id: id,
            }
        })
        if (!user) {
            res.status(404);
            throw new Error("Id does not exist")
        }
        user.set({
            state: STATE.DELETED,
        })
        await user.save();
        res.status(200).json({ message: "Delete successfully", });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not delete user",
            error: <Error>err.message,
        });
    }
}
export {
    getUser,
    getListUser,
    createUser,
    updateUser,
    deleteUser
}