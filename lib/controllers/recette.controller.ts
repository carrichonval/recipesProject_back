import { Request, Response } from "express";
import { Recette } from "../models/recette.model";
import { Op } from "sequelize";

export class RecetteController {

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
   

}