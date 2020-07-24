import { Application } from 'express';
import { UserController } from '../controllers/user.controller'

export class UserRoutes {
    public userController: UserController = new UserController()
    constructor() { }
    public routes = (app: Application) => {
        app.route('/users')
        .get(this.userController.getUser) // Read.
        .post() // Create.
        .patch() // Update.
        .delete() // Delete.
    }
}