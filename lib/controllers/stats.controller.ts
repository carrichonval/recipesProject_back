import { Request, Response } from "express";

import { Recette } from "../models/recette.model";
import { Result } from "../models/result.model";
import { Op } from "sequelize";

export class StatsController {

    public async getGeneral (req: Request, res: Response) {
     
        const totalRecettes = await Recette.count().catch((err: Error) => res.json(err))
        const totalAchieves = await Recette.sum("achieve").catch((err: Error) => res.json(err))
        const totalResults = await Result.count().catch((err: Error) => res.json(err))

        const total = {
            "recettes":totalRecettes,
            "achieves":totalAchieves,
            "feeds":totalResults,
        }

        res.json(total)
        
    }

    public async getStatsUser (req: Request, res: Response) {
     
        const totalRecettes = await Recette.count({ where: { "user_id": { [Op.eq]: req.params.id } } }).catch((err: Error) => res.json(err))
        const totalAchieves = await Recette.sum('achieve', { where: { "user_id": { [Op.eq]: req.params.id } } }).catch((err: Error) => res.json(err))
        const totalResults = await Result.count({ where: { "user_id": { [Op.eq]: req.params.id } } }).catch((err: Error) => res.json(err))

        const total = {
            "recettes":totalRecettes,
            "achieves":totalAchieves,
            "feeds":totalResults,
        }

        res.json(total)
        
    }

    

}