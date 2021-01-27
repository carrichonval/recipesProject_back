import { Request, Response } from "express";
import { Result } from "../models/result.model";
import { Op } from "sequelize";

export class ResultController {

    public async getResults (req: Request, res: Response) {

        Result.findAll<Result>({
            order: [
                ['id', 'ASC']
            ],
            include: [
                Result.associations.result_likes,
                Result.associations.result_comments,
                Result.associations.user
            ]
        })
            .then((results: Array<Result>) => res.json(results))
            .catch((err: Error) => res.status(500).json(err))
    }

    public getResult (req: Request, res: Response) {

        Result.findOne({ 
            where: { id: req.params.id },
            include: [
                Result.associations.result_likes,
                Result.associations.result_comments,
                Result.associations.user
            ]
         })
            .then((result: Result) => res.json(result))
            .catch((err: Error) => res.status(500).json(err))
    }
   

}