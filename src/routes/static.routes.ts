import { Application } from 'express';
import { StaticController } from '../controllers/static.controller';
import { Middleware } from '../middlewares';
import staticValidation from '../validators/static.validations'

export class StaticRoutes extends Middleware {
    public staticController: StaticController = new StaticController();
    constructor() { super() }

    public routes = (app: Application) => {

        app.route('/static/food-restriction/page/:page/count/:count')
            .get(staticValidation.getFoodRestrictions,this.valid, this.staticController.getFoodRestrictions) // Read.

        app.route('/static/food-restriction')
            .post(staticValidation.foodRestriction,this.valid, this.staticController.createFoodRestrictions) // Create.
        // .patch(this.staticController.updateUser) // Update.
        // .delete(this.staticController.deleteUser) // Delete.
    }
}