import { DataTypes, Model } from "sequelize";
import { v4 as uuid } from "uuid";
import { GENDER, ROLE, STATE } from "../enum/enum";
import { sequelizeConnection } from "../database";

class User extends Model {
    declare id: string;
    declare name: string;
    declare birthday: Date;
    declare phone: string;
    declare gender: GENDER;
    declare email: string;
    declare state: STATE;
    declare option: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}
User.init(
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
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return this.getDataValue("birthday").getTime();
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM,
            values: [GENDER.MALE, GENDER.FEMALE],
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
        tableName: "User",
        timestamps: true,
        charset: "utf8",
    }
);
export { User };
