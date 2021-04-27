// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";

//Modèle d'une etape d'une recette

export class Etape extends Model {
    public id : number
    public step : number
    public detail : string
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
        detail: {
            type: new DataTypes.STRING(250),
            allowNull: false,
        },

    },
    {
        tableName: "etape",
        sequelize: database,
        timestamps: false
    }
);
