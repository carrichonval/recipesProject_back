// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";

//Modèle d'un commentaire d'un résultat

export class ResultComment extends Model {
    public comment : string
}
ResultComment.init(
    {
        comment: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
    },
    {
        sequelize: database,
        tableName: 'result_comment',
        timestamps: false
    }
)