import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import validation from '../validators/user.schema';

export class UserRoutes {
    public userController: UserController = new UserController()
    constructor() { }
    public routes = (app: Application) => {
        app.route('/users')
            .get(validation.loginSchema, this.userController.getUser) // Read.
            .post() // Create.
            .patch() // Update.
            .delete() // Delete.
    }
}