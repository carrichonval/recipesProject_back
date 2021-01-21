// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";


export class Recette extends Model {
    public id : number;
    public name : string;
    public note : number;
    public comment : string;
}

Recette.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        note: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: new DataTypes.STRING(150),
            allowNull: false,
        },
    },
    {
        tableName: "recette",
        sequelize: database, // this bit is important,
        timestamps: false
    }
);
