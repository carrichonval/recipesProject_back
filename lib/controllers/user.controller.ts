import { Request, Response } from "express";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Recette } from "../models/recette.model";

export class UserController {

    //getUsers avec pagination et filtre sur le first_name
    public async getUsers (req: Request, res: Response) {

        const count : number= await User.count()
        const element : number | number = parseInt(req.query.element as string) || count
        const page : number = parseInt(req.query.page as string) || 0
        const search : string = req.query.name as string || ""

        let jump : number 

        if(page == 0){
            jump =0
        }else{
            jump = element * (page-1)
        }

        User.findAll<User>({
            order: [
                ['id', 'ASC']
            ],
            offset:jump,
            limit:element,
            include: [
                User.associations.recettes,
                User.associations.result_likes,
                User.associations.result_comments,
                User.associations.results,
                User.associations.recette_notes
            ],
            where:{
                "first_name":{
                    [Op.substring]:search
                }
            }
        })
            .then((users: Array<User>) => res.json(users))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }

    public getUser (req: Request, res: Response) {
        User.findOne({ 
            where: { id: req.params.id },
            include: [
                User.associations.recettes,
                User.associations.result_likes,
                User.associations.result_comments,
                User.associations.results,
                User.associations.recette_notes
            ]
         })
            .then((user: User) => res.json(user))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }

    public getEmails (req: Request, res: Response) {
        User.findAll({ 
            attributes: ['email']
         })
            .then((users: Array<User>) => res.json(users))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }

    public getLogins (req: Request, res: Response) {
        User.findAll({ 
            attributes: ['login']
         })
            .then((users: Array<User>) => res.json(users))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }

    public async addUser (req: Request, res: Response) {
        let password: String = await bcrypt.hash(req.body.password, 10);

        await User.create({ 
                email: req.body.email,
                login: req.body.login,
                password: password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                description: req.body.description,
                achieve: req.body.achieve
            })
            .then((user: User) => res.json(user))
            .catch((err: Error) => res.json(err))
        ;
    }

    public removeUser (req: Request, res: Response) {
        User.destroy({ where: { id: req.params.id } })
            .then((value: number) => res.json(value))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }

    public async updateUser (req: Request, res: Response) {
        let password: String = await bcrypt.hash(req.body.password, 10);

        await User.update({
            email: req.body.email,
            login: req.body.login,
            password: password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            description: req.body.description,
            achieve : req.body.achieve
        },{ where: { id: req.params.id } })
            .then(([number,users]: [number,Array<User>]) => res.json({number,users}))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }

    public async updateOrCreateUser (req: Request, res: Response) {
        let password: String = await bcrypt.hash(req.body.password, 10);

        await User.upsert({
            id:req.params.id,
            email: req.body.email,
            login: req.body.login,
            password: password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            description: req.body.description,
            achieve: req.body.achieve
        },{ returning:true})
            .then(([user,created]: [User,boolean]) => res.json({user,created}))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }

    public getMoyenneUser (req:Request, res:Response){

        Recette.findAll<Recette>({ 
            where: { user_id: req.params.id },
            include: [
                Recette.associations.etapes,
                Recette.associations.ingredients,
                Recette.associations.recette_notes
            ]
         })
            .then((recettes: Array<Recette>) =>{
                
                let count = 0
                let total = 0
                recettes.forEach((recette:Recette)=>{
                    if(recette.recette_notes.length > 0){
                        recette.recette_notes.forEach((n)=>{
                            total+=n.note
                            count ++
                        })
                    }
                })

                if(count >0){
                    res.json({note:Math.round(total / count)})
                }else{
                    res.json({note:"Pas encore noté"})
                }
            }

             )
            .catch((err: Error) => res.status(500).json(err))
    }

}