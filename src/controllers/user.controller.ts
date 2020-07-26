import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils/Responses';
import { User } from '../models/user.model';
export class UserController extends Responses {

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("inside the final controller")
            // @ts-ignore
            this.success(res, "", { ...req.body, user: req.user })
        } catch (error) {
            next(error);
        }
    }
    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(req.body)
        } catch (error) {
            next(error);
        }
    }
}