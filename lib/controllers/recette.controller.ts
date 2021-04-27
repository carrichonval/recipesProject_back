import { Request, Response } from "express";
import { Recette } from "../models/recette.model";
import { Op } from "sequelize";
import { RecetteNote } from "../models/recette_note.model";
import { Ingredient } from "../models/ingredient.model";
import { Etape } from "../models/etape.model";

export class RecetteController {

    //Récupérer toutes les recettes
    public async getRecettes (req: Request, res: Response) {

        Recette.findAll<Recette>({
            order: [
                ['id', 'ASC']
            ],
            include: [
                Recette.associations.etapes,
                Recette.associations.ingredients,
                Recette.associations.recette_notes
            ]
        })
            .then((recettes: Array<Recette>) => res.json(recettes))
            .catch((err: Error) => res.status(500).json(err))
    }

    //Récupérer les recettes d'un utilisateur
    public async getRecettesFromUser (req: Request, res: Response) {

        Recette.findAll<Recette>({
            where: { user_id: req.params.id },
            order: [
                ['id', 'ASC']
            ],
            include: [
                Recette.associations.etapes,
                Recette.associations.ingredients,
                Recette.associations.recette_notes
            ]
        })
            .then((recettes: Array<Recette>) => res.json(recettes))
            .catch((err: Error) => res.status(500).json(err))
    }

    //Récupérer une recette
    public getRecette (req: Request, res: Response) {

        Recette.findOne({ 
            where: { id: req.params.id },
            include: [
                Recette.associations.etapes,
                Recette.associations.ingredients,
                Recette.associations.recette_notes
            ]
         })
            .then((recette: Recette) => res.json(recette))
            .catch((err: Error) => res.status(500).json(err))
    }

    //Ajouter une note à une recette
    public async addNote (req: Request, res: Response) {
       
        await RecetteNote.create({
                recette_id: req.body.recette_id,
                user_id: req.body.user_id,
                note: req.body.note
            })
            .then((recette_note: RecetteNote) => res.json(recette_note))
            .catch((err: Error) => res.json(err))
        ;
    }

    //Ajouter la recette en BDD
    public async addRecette (req: Request, res: Response) {
       
        await Recette.create({
                name: req.body.recipe.name,
                comment: req.body.recipe.comment,
                type: req.body.recipe.type.label,
                user_id: req.body.user_id,
                achieve:0
            })
            .then((recette: Recette) => res.json(recette))
            .catch((err: Error) => res.json(err))
        ;
    }

    //Supprimer une recette avec ses etapes et ses ingredients
    public async deleteRecette (req:Request, res: Response){

        //Suppression des ingredients, puis des etapes, puis de la recette à cause des clef étrangères
        await Ingredient.destroy({ where: {  recette_id: req.body.recette_id} })
        .then((value: number) =>{ 
            //Suppression des étapes
            Etape.destroy({ where: {  recette_id: req.body.recette_id} })
            .then((value: number) => {
                //Suppression de la recette
                Recette.destroy({ where: { id:req.body.recette_id } })
                .then((value: number) => res.json(value))
                .catch((err: Error) => res.status(500).json(err))
            ;
            })
            .catch((err: Error) => res.status(500).json(err))
        ;
        })
        .catch((err: Error) => res.status(500).json(err))
    ;

        res.json({"status":"ok"})

    }

     //Ajoute +1 aux recettes faite par un utilisateur
     public addOneAchieve (req:Request, res:Response){
        Recette.update({
            achieve : req.body.achieve
        },{ where: { id: req.body.recette_id } })
            .then(([number,recettes]: [number,Array<Recette>]) => res.json({number,recettes}))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }
   
}