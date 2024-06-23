import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";
import { STATE } from "../database/enum/enum";
import { User } from "../database/model/User";
import { Machine } from "../database/model/Machine";
import { Authentication } from "../database/model/Authentication";

async function authen(req: Request, res: Response) {
    try {
        const { userId, machineId } = req.body;
        console.log(userId, machineId);
        const user = await User.findOne({
            where: {
                id: userId,
                state: STATE.ACTIVE
            }
        })
        if (!user) {
            res.status(404);
            throw new Error("User id does not exist");

        }
        const machine = await Machine.findOne({
            where: {
                id: machineId,
                state: STATE.ACTIVE
            }
        })
        if (!machine) {
            res.status(404);
            throw new Error("Machine id does not exist");

        }
        const authentication = await Authentication.create({
            id: uuid(),
            userId: userId,
            machineId: machineId,
            time: new Date(),
            state: STATE.ACTIVE,
            option: "",
        })
        authentication.setDataValue("user", user);
        authentication.setDataValue("machine", machine);

        res.status(200).json({ authentication });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Authentication failed",
            error: <Error>err.message,
        });
    }
}

async function getListAuth(req: Request, res: Response) {
    try {
        const authentications = await Authentication.findAll({
            where: {
                state: [STATE.ACTIVE, STATE.INACTIVE]
            }
        })
        for (var i = 0; i < authentications.length; i++) {
            const machine = await Machine.findOne({
                where: {
                    id: authentications[i].machineId
                }
            })
            const user = await User.findOne({
                where: {
                    id: authentications[i].userId
                }
            })
            if (machine) {
                authentications[i].setDataValue("machine", machine);
            }
            if (user) {
                authentications[i].setDataValue("user", user);
            }
        }
        res.status(200).json({ authentications });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not find authentication",
            error: <Error>err.message,
        });
    }
}

export {
    authen,
    getListAuth
}