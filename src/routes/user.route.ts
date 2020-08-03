import { Application } from 'express';
import { UserController } from '../controllers/user.controller';
import { Middleware } from '../middlewares';
import { userValidation } from '../validators'

export class UserRoutes extends Middleware {
    public userController: UserController = new UserController();
    constructor() { super() }

    public routes = (app: Application) => {

        app.route('/user')
            .get(this.Auth, this.userController.getUser) // Read.
            .post(userValidation.createUser, this.valid, this.userController.createUser) // Create.
            .patch(userValidation.updateUser, this.valid, this.Auth, this.userController.updateUser) // Update.
            .delete(this.Auth, this.userController.deleteUser) // Delete.

        app.route('/user/login')
            .post(userValidation.normalLogin, this.valid, this.userController.login);

        app.route('/user/social-login')
            .post(userValidation.socialLogin, this.valid, this.userController.SocialLogin);

        app.route('/user/code-verification')
            .post(userValidation.codeVerification, this.valid, this.Auth, this.userController.codeVerify);

        app.route('/user/resend-code')
            .post(this.valid, this.Auth, this.userController.resendCode)

        app.route('/user/forgot-password')
            .post(userValidation.forgotPassword, this.valid, this.userController.forgotPass)

        app.route('/user/password-reset')
            .post(userValidation.resetPass, this.valid, this.Auth, this.userController.resetPass)

    }
}