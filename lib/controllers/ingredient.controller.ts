import { Request, Response } from "express";
import { Op } from "sequelize";
import { Ingredient } from "../models/ingredient.model";

export class IngredientController {


    public async addIngredient (req: Request, res: Response) {
       
        await Ingredient.create({
                name: req.body.name,
                quantity: req.body.quantity,
                recette_id: req.body.recette_id
            })
            .then((ingredient: Ingredient) => res.json(ingredient))
            .catch((err: Error) => res.json(err))
        ;
    }
}