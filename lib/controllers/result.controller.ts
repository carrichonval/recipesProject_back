import { Request, Response } from "express";
import { Result } from "../models/result.model";
import { Op } from "sequelize";
import { ResultComment } from '../models/result_comment.model'


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

    public async addComment (req: Request, res: Response) {
       
        await ResultComment.create({
                result_id: req.body.result_id,
                user_id: req.body.user_id,
                comment: req.body.comment,
            })
            .then((result_comment: ResultComment) => res.json(result_comment))
            .catch((err: Error) => res.json(err))
        ;
    }
   

}