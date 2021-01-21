import { Request, Response } from "express";
import { Recette } from "../models/recette.model";
import { Op } from "sequelize";

export class RecetteController {

    public async getRecettes (req: Request, res: Response) {

        Recette.findAll<Recette>({
            order: [
                ['id', 'ASC']
            ]
        })
            .then((recettes: Array<Recette>) => res.json(recettes))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }

   

}