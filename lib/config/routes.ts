import * as express from "express";
import { RecetteController } from "../controllers/recette.controller";
import { UserController } from '../controllers/user.controller'
import { ResultController } from '../controllers/result.controller'
import { StatsController } from "../controllers/stats.controller";
import { AuthController } from "../controllers/auth.controller";
import { IngredientController } from '../controllers/ingredient.controller';
import { EtapeController } from '../controllers/etape.controller';

//Contient toutes les routes nécessaire aufonctionnement de l'API

export class Routes {
    public app: express.Application;

    public recetteController : RecetteController = new RecetteController();
    public userController : UserController = new UserController();
    public resultController : ResultController = new ResultController();
    public statsController : StatsController = new StatsController();
    public authController : AuthController = new AuthController();
    public ingredientController : IngredientController = new IngredientController();
    public etapeController : EtapeController = new EtapeController();

    public routes(app): void {

        //------------------
        app.route("/register")
            .post(this.authController.register)
        app.route("/login")
            .post(this.authController.login)

        app.route("/recettes")
            .get(this.recetteController.getRecettes)
            .post(this.recetteController.addRecette)
            .delete(this.recetteController.deleteRecette)
        app.route("/recettes/:id")
            .get(this.recetteController.getRecette)
        app.route("/recettes/user/:id")
            .get(this.recetteController.getRecettesFromUser)
       
        
        app.route("/ingredients")
            .post(this.ingredientController.addIngredient)
        app.route("/etapes")
            .post(this.etapeController.addEtape)

        app.route("/users")
            .get(this.userController.getUsers)
            .post(this.userController.addUser)
        app.route("/users/emails")
            .get(this.userController.getEmails)
        app.route("/users/logins")
            .get(this.userController.getLogins)
        app.route("/users/:id")
            .get(this.userController.getUser)
            .delete(this.userController.removeUser)
            .put(this.userController.updateOrCreateUser)
            .patch(this.userController.updateUser)
        app.route("/users/achieve")
            .post(this.userController.addOneAchieve)
            
        app.route("/getMoyenne/:id")
                .get(this.userController.getMoyenneUser)

        app.route("/results")
            .get(this.resultController.getResults)
            .post(this.resultController.addResult)
            .delete(this.resultController.deleteResult)
        app.route("/results/:id")
            .get(this.resultController.getResult)
        app.route("/results/users/:id")
            .get(this.resultController.getResultFromUser)

        app.route("/comments")
            .post(this.resultController.addComment)

        app.route("/notes")
            .post(this.recetteController.addNote)

        app.route("/likes")
            .post(this.resultController.addLike)
        app.route("/unlikes")
            .post(this.resultController.deleteLike)

        app.route("/stats")
            .get(this.statsController.getGeneral)
        app.route("/stats/:id")
            .get(this.statsController.getStatsUser)

    }

}