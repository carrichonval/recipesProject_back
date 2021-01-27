import * as express from "express";
import { RecetteController } from "../controllers/recette.controller";
import { UserController } from '../controllers/user.controller'
import { ResultController } from '../controllers/result.controller'
import { StatsController } from "../controllers/stats.controller";
import { AuthController } from '../controllers/auth.controller'

export class Routes {
    public app: express.Application;

    public recetteController : RecetteController = new RecetteController();
    public userController : UserController = new UserController();
    public resultController : ResultController = new ResultController();
    public statsController : StatsController = new StatsController();
    public authController : AuthController = new AuthController();


    public routes(app): void {
        //------------------
        app.route("/register")
            .post(this.authController.register)

        app.route("/recettes")
            .get(this.recetteController.getRecettes)
        app.route("/recettes/:id")
            .get(this.recetteController.getRecette)

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

        app.route("/results")
            .get(this.resultController.getResults)
        app.route("/results/:id")
            .get(this.resultController.getResult)

        app.route("/stats")
            .get(this.statsController.getGeneral)
        app.route("/stats/:id")
            .get(this.statsController.getStatsUser)

    }

}