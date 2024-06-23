import { Request, Response } from "express";
import { ROLE, STATE } from "../database/enum/enum";
import { Machine } from "../database/model/Machine";
import { v4 as uuid } from "uuid";

async function getMachine(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const machine = await Machine.findOne({
            where: {
                id: id,
                state: [STATE.ACTIVE]
            }
        })
        if (!machine) {
            res.status(404);
            throw new Error("Id does not exist");

        }
        res.status(200).json({ machine });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not find machine",
            error: <Error>err.message,
        });
    }
}

async function getListMachine(req: Request, res: Response) {
    try {
        const machines = await Machine.findAll({
            where: {
                state: [STATE.ACTIVE, STATE.INACTIVE]
            }
        })
        res.status(200).json({ machines });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not find machine",
            error: <Error>err.message,
        });
    }
}

async function createMachine(req: Request, res: Response) {
    try {
        const reqMachine: Machine = req.body;
        if (!reqMachine.code || !reqMachine.location || !reqMachine.address || !reqMachine.state) {
            res.status(422);
            throw new Error("Missing data body");
        }
        const machine = await Machine.create({
            id: uuid(),
            code: reqMachine.code,
            location: reqMachine.location,
            address: reqMachine.address,
            state: reqMachine.state,
            option: reqMachine.option,
        })
        res.status(200).json({ machine });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not create machine",
            error: <Error>err.message,
        });
    }
}

async function updateMachine(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const reqMachine: Machine = req.body;
        if (!reqMachine.code || !reqMachine.location || !reqMachine.address || !reqMachine.state) {
            res.status(422);
            throw new Error("Missing data body");
        }
        const machine = await Machine.findOne({
            where: {
                id: id
            }
        })
        if (!machine) {
            res.status(404);
            throw new Error("Id does not exist")
        }
        machine.set({
            id: uuid(),
            code: reqMachine.code,
            location: reqMachine.location,
            addrss: reqMachine.address,
            state: reqMachine.state,
            option: reqMachine.option,
        })
        await machine.save();
        res.status(200).json({ machine });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not update machine",
            error: <Error>err.message,
        });
    }
}

async function deleteMachine(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const machine = await Machine.findOne({
            where: {
                id: id,
            }
        })
        if (!machine) {
            res.status(404);
            throw new Error("Id does not exist")
        }
        machine.set({
            state: STATE.DELETED,
        })
        await machine.save();
        res.status(200).json({ message: "Delete successfully", });
    } catch (err: any) {
        var statusCode = res.statusCode == 200 ? null : res.statusCode;
        statusCode = statusCode || 404;
        res.status(statusCode).json({
            message: "Could not delete machine",
            error: <Error>err.message,
        });
    }
}

export {
    getMachine,
    getListMachine,
    createMachine,
    updateMachine,
    deleteMachine
}