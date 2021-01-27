// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";


export class Result extends Model {
    public id : number
    public image : string
}

Result.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        step: {
            type: new DataTypes.STRING(250),
            allowNull: false,
        },

    },
    {
        tableName: "result",
        sequelize: database, // this bit is important,
        timestamps: false
    }
);

