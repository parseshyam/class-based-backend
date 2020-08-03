import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils/Response';
import { FoodRestrict } from '../models/static.models.ts/food_restrictions';
import { _static as STATIC } from '../utils/messages';

export class StaticController extends Responses {

    public createFoodRestrictions = async (req: Request, res: Response, next: NextFunction) => {
        const { name, place_holder, data } = req.body;
        try {
            const createFoodRestrict = await FoodRestrict.create({
                name,
                place_holder,
                data
            });
            return this.success(res, createFoodRestrict, STATIC.ADDED);
        } catch (error) {
            next(error)
        }
    }

    public getFoodRestrictions = async (req: Request, res: Response, next: NextFunction) => {
        let { page = 1, count = 10 } = req.params;
        // @ts-ignore
        let offset = parseInt(page - 1) * parseInt(count);
        // @ts-ignore
        let limit = parseInt(count);
        try {
            const found = await FoodRestrict.findAll({
                attributes: {
                    exclude: STATIC.EXCLUDE
                },
                offset: offset,
                limit: limit
            })
            // 
            if (found?.length > 0)
                return this.success(res, [...found], STATIC.FOUND);
            return this.failed(res, {}, STATIC.NOT_FOUND, 200);
        } catch (error) {
            next(error)
        }
    }
    
}