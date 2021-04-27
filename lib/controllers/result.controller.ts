import { Request, Response } from "express";
import { Result } from "../models/result.model";
import { Op } from "sequelize";
import { ResultComment } from '../models/result_comment.model'
import { ResultLike } from "../models/result_like.model";


export class ResultController {

    //Récupérer les résultats
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

    //Récupérer un résultat
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

    //Récupérer les résultats d'un utilisateur
    public getResultFromUser (req: Request, res: Response) {

        Result.findAll({ 
            where: { user_id: req.params.id },
            include: [
                Result.associations.result_likes,
                Result.associations.result_comments,
                Result.associations.user
            ]
         })
            .then((results: Array<Result>) => res.json(results))
            .catch((err: Error) => res.status(500).json(err))
    }

    //Ajouter un commentaire à un résultat
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

    //Ajouter un like à un résultat
    public async addLike (req: Request, res: Response) {
       
        await ResultLike.create({
                result_id: req.body.result_id,
                user_id: req.body.user_id
            })
            .then((result_like: ResultLike) => res.json(result_like))
            .catch((err: Error) => res.json(err))
        ;
    }
 
    //Ajouter un résultat 
    public async addResult (req: Request, res: Response) {
        
        await Result.create({
            image:"ajout",
            user_id: req.body.user_id,
        })
        .then((result: Result) => res.json(result))
        .catch((err: Error) => res.json(err))
        ;
    }
    
    //Supprimer un like d'un résultat
    public async deleteLike (req: Request, res: Response) {
       
        await ResultLike.destroy({ where: {  result_id: req.body.result_id, user_id: req.body.user_id } })
            .then((value: number) => res.json(value))
            .catch((err: Error) => res.status(500).json(err))
        ;

    }

    //Supprimer un commentaire d'un résultat
    public async deleteComment (req: Request, res: Response) {
       
        await ResultComment.destroy({ where: {  result_id: req.body.result_id, user_id: req.body.user_id } })
            .then((value: number) => res.json(value))
            .catch((err: Error) => res.status(500).json(err))
        ;

    }

    //Supprimer un résultat
    public async deleteResult (req:Request, res: Response){

        //Suppression des likes, puis des commentaires, puis du résultat à cause des clefs étrangères

        await ResultLike.destroy({ where: {  result_id: req.body.result_id, user_id: req.body.user_id } })
        .then((value: number) =>{ 
            //Suppression des commentaires
            ResultComment.destroy({ where: {  result_id: req.body.result_id, user_id: req.body.user_id } })
            .then((value: number) => {
                //Supression du résultat
                Result.destroy({ where: { id:req.body.result_id } })
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

}