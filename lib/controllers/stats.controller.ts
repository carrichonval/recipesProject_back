import { Request, Response } from "express";

import { Recette } from "../models/recette.model"
import { User } from '../models/user.model'
import { Result } from "../models/result.model"
import { Op } from "sequelize"

export class StatsController {

    //Récupère les stats global à l'application
    public async getGeneral (req: Request, res: Response) {
     
        const totalRecettes = await Recette.count().catch((err: Error) => res.json(err))
        const totalAchieves = await User.sum("achieve").catch((err: Error) => res.json(err))
        const totalResults = await Result.count().catch((err: Error) => res.json(err))

        const total = {
            "recettes":totalRecettes,
            "achieves":totalAchieves,
            "feeds":totalResults,
        }

        res.json(total)
        
    }

    //Récupère les stats d'un utilisateur
    public async getStatsUser (req: Request, res: Response) {
     
        const totalRecettes = await Recette.count({ where: { "user_id": { [Op.eq]: req.params.id } } }).catch((err: Error) => res.json(err))
        const totalAchieves = await User.findOne({ where: { id: req.params.id }}).catch((err: Error) => res.json(err)) 
        const totalResults = await Result.count({ where: { "user_id": { [Op.eq]: req.params.id } } }).catch((err: Error) => res.json(err))

        const total = {
            "recettes":totalRecettes,
            "achieves":totalAchieves,
            "feeds":totalResults,
        }

        res.json(total)
        
    }

    

}