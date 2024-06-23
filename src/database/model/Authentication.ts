import { DataTypes, Model } from "sequelize";
import { v4 as uuid } from "uuid";
import { ROLE, STATE } from "../enum/enum";
import { sequelizeConnection } from "../database";

class Authentication extends Model {
    declare id: string;
    declare userId: string;
    declare machineId: string;
    declare time: Date;
    declare state: STATE;
    declare option: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}
Authentication.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuid(),
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "user_id",
        },
        machineId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "machine_id",
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return this.getDataValue("time").getTime();
            },
        },
        state: {
            type: DataTypes.ENUM,
            values: [STATE.ACTIVE, STATE.INACTIVE, STATE.DELETED],
            allowNull: false,
        },
        option: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return this.getDataValue("createdAt").getTime();
            },
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return this.getDataValue("createdAt").getTime();
            },
        },
    },
    {
        sequelize: sequelizeConnection,
        tableName: "Authentication",
        timestamps: true,
        charset: "utf8",
    }
);
export { Authentication };
