// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";

//Modèle d'une note attribué à une recette

export class RecetteNote extends Model {
    public note : number
}
RecetteNote.init(
    {
        note: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'recette_note',
        timestamps: false
    }
)