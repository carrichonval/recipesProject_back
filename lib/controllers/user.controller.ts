import { Request, Response } from "express";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import { Op } from "sequelize";

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
            ]
         })
            .then((user: User) => res.json(user))
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
        },{ returning:true})
            .then(([user,created]: [User,boolean]) => res.json({user,created}))
            .catch((err: Error) => res.status(500).json(err))
        ;
    }

}