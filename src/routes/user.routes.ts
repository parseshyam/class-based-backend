import { Application } from 'express';
import { UserController } from '../controllers/user.controller';
import { Middlewares } from '../middlewares';
import valid from '../validators/user.schema'
export class UserRoutes extends Middlewares {
    public userController: UserController = new UserController()
    constructor() { super() }
    public routes = (app: Application) => {
        app.route('/user')
            .get(this.valid, this.userController.getUser) // Read.
            .post() // Create.
            .patch() // Update.
            .delete() // Delete.

        app.route('/user/register')
            .post(valid.registerSchema, this.valid, this.Auth, this.userController.register);
    }
}