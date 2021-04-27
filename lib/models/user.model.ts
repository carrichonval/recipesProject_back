import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";
import { Recette } from './recette.model'
import { Result } from './result.model'
import { ResultLike } from './result_like.model';
import { ResultComment} from './result_comment.model';
import { RecetteNote } from './recette_note.model'

//Modèle d'un utilisateur

export class User extends Model {
    public id : number
    public email : string
    public login : string
    public password : string
    public first_name : string
    public last_name : string
    public description : string
    public achieve : number
    public createdAt : Date
    public updatedAt : Date
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
        achieve:{
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: new DataTypes.DATE,
            allowNull: true,
        },
        
        updatedAt: {
            type: new DataTypes.DATE,
            allowNull: true,
        },

    },
    {
        tableName: "user",
        sequelize: database,
        timestamps: true
    }
);



//Liaisons avec les recettes
User.hasMany(Recette, {
    as : "recettes",
    foreignKey: "user_id",
});

Recette.belongsTo(User, {
    as: "user",
    foreignKey: "user_id",
});

//Liaisons avec les resultats
User.hasMany(Result, {
    as : "results",
    foreignKey: "user_id",
});

Result.belongsTo(User, {
    as: "user",
    foreignKey: "user_id",
});

//liaisons pour les likes

User.belongsToMany(Result, {
    as: "result_likes",
    foreignKey: "user_id",
    through: ResultLike,
    timestamps: false
});

Result.belongsToMany(User, {
    as : "users_likes",
    foreignKey: "result_id",
    through: ResultLike,
    timestamps: false
});


//liaisons avec les commentaires

User.belongsToMany(Result, {
    as: "result_comments",
    foreignKey: "user_id",
    through: ResultComment,
    timestamps: false
});

Result.belongsToMany(User, {
    as : "users_comments",
    foreignKey: "result_id",
    through: ResultComment,
    timestamps: false
});


//liaisons avec les notes

User.belongsToMany(Recette, {
    as: "recette_notes",
    foreignKey: "user_id",
    through: RecetteNote,
    timestamps: false
});

Recette.belongsToMany(User, {
    as : "users_notes",
    foreignKey: "recette_id",
    through: RecetteNote,
    timestamps: false
});

