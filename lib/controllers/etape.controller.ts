import { Request, Response } from "express";
import { Op } from "sequelize";
import { Etape } from "../models/etape.model";

export class EtapeController {

    //Ajouter une étape de recette 
    public async addEtape (req: Request, res: Response) {
       
        await Etape.create({
                step: req.body.step,
                detail: req.body.detail,
                recette_id: req.body.recette_id
            })
            .then((etape: Etape) => res.json(etape))
            .catch((err: Error) => res.json(err))
        ;
    }
}