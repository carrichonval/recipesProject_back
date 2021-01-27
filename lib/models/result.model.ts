// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";
import {ResultLike} from './result_like.model'
import { ResultComment } from './result_comment.model'
import { User } from './user.model'


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
        sequelize: database, // this bit is important,
        timestamps: false
    }
);


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