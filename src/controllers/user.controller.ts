import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils/Responses';
import { User } from '../models/user.model';
import { hash, compare } from 'bcrypt'
import { generate_tokens } from '../utils/helper.functions';
export class UserController extends Responses {

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { password } = req.body;
            let hashedPass = await hash(password, 10);
            let user: any = await User.create({ ...req.body, password: hashedPass });
            delete user.dataValues.password;
            delete user.dataValues.phone_number;
            delete user.dataValues.socket_id;
            let tokens = generate_tokens(user.dataValues);
            this.success(res, { user, auth: tokens }, "", 200);
        } catch (error) {
            // console.log(error)
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