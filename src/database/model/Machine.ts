import { DataTypes, Model } from "sequelize";
import { v4 as uuid } from "uuid";
import { GENDER, ROLE, STATE } from "../enum/enum";
import { sequelizeConnection } from "../database";

class Machine extends Model {
    declare id: string;
    declare code: string;
    declare location: string;
    declare address: string;
    declare state: STATE;
    declare option: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}
Machine.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuid(),
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: "Machine",
        timestamps: true,
        charset: "utf8",
    }
);
export { Machine };
