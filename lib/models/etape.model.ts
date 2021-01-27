// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";


export class Etape extends Model {
    public id : number
    public step : number
    public details : string
}

Etape.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        step: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        details: {
            type: new DataTypes.STRING(250),
            allowNull: false,
        },

    },
    {
        tableName: "etape",
        sequelize: database, // this bit is important,
        timestamps: false
    }
);
