// lib/models/node.model.ts
import { Model} from "sequelize";
import { database } from "../config/database";

//Modèle d'un like de résultat

export class ResultLike extends Model {}

ResultLike.init({},
    {
        sequelize: database,
        tableName: 'result_like',
        timestamps: false
    }
)