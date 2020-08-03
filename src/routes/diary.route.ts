import { Application } from 'express';
import { DiaryController } from '../controllers/diary.controller'
import { Middleware } from '../middlewares';
import { diaryValidation } from '../validators';

export class DiaryRoutes extends Middleware {

    public diaryController: DiaryController = new DiaryController();

    constructor() { super() }

    public routes = (app: Application) => {

        app.route('/user/diary/food')
            .get(this.Auth, diaryValidation.getFoodDiary, this.valid, this.diaryController.getFoodDiary) // Read.
            .post(this.Auth, diaryValidation.createFoodDiary, this.valid, this.diaryController.addDiaryFood) // Create.
            .patch(this.Auth, diaryValidation.updateFoodDiary, this.valid, this.diaryController.updateDiaryFood) // Update.
            .delete(this.Auth, diaryValidation.deleteFoodDiary, this.valid, this.diaryController.deleteDiaryFood) // Delete.

        app.route('/user/diary/symptoms')
            .get() // Read.
            .patch() // Create and Update.
            .delete() // Delete.

        app.route('/user/diary/stress')
            .get() // Read.
            .patch() // Create and Update.
            .delete() // Delete.

        app.route('/user/diary/anxiety')
            .get() // Read.
            .patch() // Create and Update.
            .delete() // Delete.

        app.route('/user/diary/water-intake')
            .get() // Read.
            .patch() // Create and Update.
            .delete() // Delete.

        app.route('/user/diary/exercise')
            .get() // Read.
            .patch() // Create and Update.
            .delete() // Delete.

        app.route('/user/diary/sleep')
            .get() // Read.
            .patch() // Create and Update.
            .delete() // Delete.
    }

}