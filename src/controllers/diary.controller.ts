import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils/Response';
import { FoodDiary } from '../models/food_diary';
import { Op } from 'sequelize';
import { getFirstLastDate } from '../utils/helper';

export class DiaryController extends Responses {

    // CRUD OPERATIONS FOR USER FOOD DIARY.
    public getFoodDiary = async (req: Request, res: Response, next: NextFunction) => {
        const { sortBy } = req.query;
        try {
            //@ts-ignore
            const userId = req.user.id;
            let { gt, lt } = await getFirstLastDate(sortBy);
            const foodDiary = await FoodDiary.findAndCountAll({
                where: {
                    user_id: userId,
                    createdAt: {
                        [Op.gt]: gt,
                        [Op.lt]: lt
                    },
                }
            });
            return this.success(res, { food_diary: foodDiary }, "Found user food diary");
        } catch (error) {
            next(error);
        }
    }

    public addDiaryFood = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const userId = req.user.id;
            const foodDiary = await FoodDiary.create({ ...req.body, user_id: userId });
            return this.success(res, { food_diary: foodDiary }, "Food added to user diary");
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    public updateDiaryFood = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const userId = req.user.id;
            //@ts-ignore
            let { food_id, ...restData } = req.body;
            let updatedFoodDiary = await FoodDiary.update({
                ...restData
            }, {
                where: {
                    id: food_id,
                    user_id: userId
                },
                returning: true
            });
            console.log(updatedFoodDiary)
            if (!updatedFoodDiary[0])
                return this.failed(res, {}, "Food not found in food diary to update");
            return this.success(res, { food_diary: updatedFoodDiary[1][0] }, "Food updated to user diary");
        } catch (error) {
            next(error);
        }
    }

    public deleteDiaryFood = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            console.log(req.user)
            //@ts-ignore
            const userId = req.user.id;
            //@ts-ignore
            let { food_id } = req.body;
            let deleted = await FoodDiary.destroy({
                where: {
                    user_id: userId,
                    id: food_id
                },
            })
            if (!deleted)
                return this.failed(res, {}, "Food not found in food diary to delete", 200);
            return this.success(res, {}, "Food removed from user diary");
        } catch (error) {
            next(error);
        }
    }

    // CRUD OPERATIONS FOR USER FOOD DIARY.
}