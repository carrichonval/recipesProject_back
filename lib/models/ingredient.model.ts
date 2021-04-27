// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";

//Modèle d'un ingredient d'une recette

export class Ingredient extends Model {
    public id : number
    public name : string
    public quantity : number
}

Ingredient.init(
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
        quantity: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "ingredient",
        sequelize: database, 
        timestamps: false
    }
);
