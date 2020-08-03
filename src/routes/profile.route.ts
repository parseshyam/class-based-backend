import { Application } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { Middleware } from '../middlewares';
import { profileValidation } from '../validators';
export class ProfileRoutes extends Middleware {

    public profileController: ProfileController = new ProfileController();

    constructor() { super() }

    public routes = (app: Application) => {

        app.route('/user/profile')
            .get(this.Auth, this.profileController.getProfile) // Read.
            .patch(profileValidation.userProfile, this.valid, this.Auth, this.profileController.createUpdateProfile) // Create and Update.
            .delete(this.Auth, this.profileController.deleteProfile) // Delete.

        app.route('/user/wig-wag')
            .get(this.Auth, this.profileController.getWigWagCard) // Read.
            .patch(profileValidation.wigWag,this.valid, this.Auth, this.profileController.createUpdateWigWagCard) // Create and Update.
            .delete(this.Auth, this.profileController.deleteProfile) // Delete.
    }

}