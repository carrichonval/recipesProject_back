// lib/models/node.model.ts
import { Model, DataTypes} from "sequelize";
import { database } from "../config/database";
import { Etape } from './etape.model'
import { Ingredient } from './ingredient.model'
import { RecetteNote } from './recette_note.model'


export class Recette extends Model {
    public id : number
    public name : string
    public note : number
    public comment : string
    public type : string
    public achieve : number
    public image : string
    public recette_notes : Array<RecetteNote>
    public createdAt : Date
    public updatedAt : Date
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
            allowNull: true,
        },
        comment: {
            type: new DataTypes.STRING(150),
            allowNull: true,
        },
        type: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        achieve: {
            type: new DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: new DataTypes.STRING(200),
            allowNull: true,
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
        tableName: "recette",
        sequelize: database, // this bit is important,
        timestamps: true
    }
);

//Liaisons avec Etapes

Recette.hasMany(Etape, {
    as : "etapes",
    foreignKey: "recette_id",
    sourceKey: "id"
});

Etape.belongsTo(Recette, {
    as: "recette",
    foreignKey: "id",
    targetKey: "id"
});

//Liaisons avec ingredients

Recette.hasMany(Ingredient, {
    as : "ingredients",
    foreignKey: "recette_id",
    sourceKey: "id"
});

Ingredient.belongsTo(Recette, {
    as: "recette",
    foreignKey: "id",
    targetKey: "id"
});

//liasions avec les notes
Recette.hasMany(RecetteNote, {
    as : "recette_notes",
    foreignKey: "recette_id",
    sourceKey: "id"
});

RecetteNote.belongsTo(Recette, {
    as: "recette_note",
    foreignKey: "id",
    targetKey: "id"
});