import { DataTypes, Model } from "sequelize";
import { v4 as uuid } from "uuid";
import { ROLE, STATE } from "../enum/enum";
import { sequelizeConnection } from "../database";

class Account extends Model {
    declare id: string;
    declare name: string;
    declare username: string;
    declare password: string;
    declare phone: string;
    declare email: string;
    declare role: ROLE;
    declare state: STATE;
    declare option: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}
Account.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuid(),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: [ROLE.ADMIN, ROLE.MANAGER],
            allowNull: false,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
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
        tableName: "Account",
        timestamps: true,
        charset: "utf8",
    }
);
export { Account };
