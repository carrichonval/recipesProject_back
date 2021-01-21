import * as express from "express";
import { RecetteController } from "../controllers/recette.controller";

export class Routes {
    public app: express.Application;

    public recetteController: RecetteController = new RecetteController();

    public routes(app): void {
        //------------------

        app.route("/recettes")
            .get(this.recetteController.getRecettes)

    }

}