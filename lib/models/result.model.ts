// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";
import {ResultLike} from './result_like.model'
import { ResultComment } from './result_comment.model'

//Modèle d'un résultat

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
        image: {
            type: new DataTypes.STRING(250),
            allowNull: false,
        },

    },
    {
        tableName: "result",
        sequelize: database,
        timestamps: false
    }
);

//Liaisons avec les likes 

Result.hasMany(ResultLike, {
    as : "result_likes",
    foreignKey: "result_id",
    sourceKey: "id"
});

ResultLike.belongsTo(Result, {
    as: "result",
    foreignKey: "id",
    targetKey: "id"
});

//Liaisons avec les commentaires

Result.hasMany(ResultComment, {
    as : "result_comments",
    foreignKey: "result_id",
    sourceKey: "id"
});

ResultComment.belongsTo(Result, {
    as: "result",
    foreignKey: "id",
    targetKey: "id"
});