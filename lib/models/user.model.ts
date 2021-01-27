import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";
import { Recette } from './recette.model'
import { Result } from './result.model'
import { ResultLike } from './result_like.model'
import { ResultComment} from './result_comment.model'

export class User extends Model {
    public id : number
    public email : string
    public login : string
    public password : string
    public first_name : string
    public last_name : string
    public description : string
    public created_At : Date
    public updated_At : Date
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        login: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        
        first_name: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        
        last_name: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        
        description: {
            type: new DataTypes.STRING(500),
            allowNull: true,
        },
        
        created_At: {
            type: new DataTypes.DATE,
            allowNull: true,
        },
        
        updated_At: {
            type: new DataTypes.DATE,
            allowNull: true,
        },

    },
    {
        tableName: "user",
        sequelize: database, // this bit is important,
        timestamps: true
    }
);

//Liaisons avec recette
User.hasMany(Recette, {
    as : "recettes",
    foreignKey: "user_id",
    sourceKey: "id"
});

Recette.belongsTo(User, {
    as: "user",
    foreignKey: "user_id",
    targetKey: "id"
});

//Liaisons avec recette
User.hasMany(Result, {
    as : "results",
    foreignKey: "user_id",
    sourceKey: "id"
});

Result.belongsTo(User, {
    as: "user",
    foreignKey: "user_id",
    targetKey: "id"
});

//liaisons pour les likes
Result.belongsToMany(User, {
    as : "users",
    foreignKey: "result_id",
    through: ResultLike,
    timestamps: false
});

User.belongsToMany(Result, {
    as: "results",
    foreignKey: "user_id",
    through: ResultLike,
    timestamps: false
});

//liaisons avec les commentaires

Result.belongsToMany(User, {
    as : "users",
    foreignKey: "result_id",
    through: ResultComment,
    timestamps: false
});

User.belongsToMany(Result, {
    as: "results",
    foreignKey: "user_id",
    through: ResultComment,
    timestamps: false
});