import { Application } from 'express';
import { UserController } from '../controllers/user.controller';
import { Middlewares } from '../middlewares';
import valid from '../validators/user.schema'
export class UserRoutes extends Middlewares {
    public userController: UserController = new UserController()
    constructor() { super() }
    public routes = (app: Application) => {
        app.route('/user')
            .get(this.Auth, this.userController.getUser) // Read.
            .post(valid.createUser, this.valid, this.userController.createUser) // Create.
            .patch(valid.updateUser, this.valid, this.Auth, this.userController.updateUser) // Update.
            .delete() // Delete.

        app.route('/user/login')
            .post(valid.loginSchema, this.valid, this.userController.login);

        app.route('/user/code-verification')
            .post(valid.codeVerification, this.valid, this.Auth, this.userController.codeVerify)

        app.route('/user/forgot-password/:userId?')
            .post(valid.forgotPassword, this.valid, this.userController.forgotPass)
    }
}