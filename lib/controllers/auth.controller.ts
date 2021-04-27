import { Request, Response } from "express";
import { User } from "../models/user.model";
import { createToken } from "../config/auth"
import * as bcrypt from "bcrypt";

export class AuthController {

    //Fonction permettant de connecter un utilisateur
    public async login (req: Request, res: Response) {

        //Récupération de l'utilisateur en base par son Identifiant
        User.findOne({ 
            where: { login: req.body.login },
            include: [
                User.associations.recettes,
                User.associations.result_likes,
                User.associations.result_comments,
                User.associations.results,
            ]
        })
        .then((user: User) => {
             // user = object || user = null
            if(!user){
                res.json({ message: "Cet utilisateur n'existe pas" })
            }else{
                //Vérifier le mot de passe
                if(bcrypt.compareSync(req.body.password,user.password)){
                    const token = createToken(user)
                    res.json({ access_token: token })
                }else{
                    //Si mot de passe incorrect, on renvoie une erreur
                    res.json({ message: 'Mot de passe incorrect' })
                }
            }
        })
        .catch((err: Error) => res.json(err))
    }

    //Fonction pour enregistrer un utilisateur en base de données
    public async register (req: Request, res: Response) {
        //Cryptage du mot de passe
        let password: String = await bcrypt.hash(req.body.password, 10);
        //Création de l'utilisateur
        await User.create({ 
                email: req.body.email,
                login: req.body.login,
                password: password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                description: req.body.description,
                achieve:0
            })
            .then(async (user: User) => {
                if(!user){
                    res.status(401).json({ message: "Une erreur s'est produite lors de l'enregistrement." })
                }else{
                    res.json(user)
                }
            })
            .catch((err: Error) => res.json(err))
    }

}