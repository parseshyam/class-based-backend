import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils/Responses';
import { User } from '../models/user.model';
import { hash, compare } from 'bcrypt'
import { generate_tokens } from '../utils/helper.functions';
export class UserController extends Responses {

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { password, email } = req.body;
            let foundUser: any = await User.findOne({ where: { email } });
            if (foundUser) {
                if (!foundUser.dataValues.verify_code) {
                    let error: any = new Error('already registered');
                    error.status = 400;
                    return next(error)
                } else {
                    delete foundUser.dataValues.password;
                    delete foundUser.dataValues.socket_id;
                    let tokens = generate_tokens(foundUser.dataValues);
                    return this.success(res, { foundUser, auth: tokens }, "", 200);
                }
            }
            let hashedPass = await hash(password, 10);
            let user: any = await User.create({
                ...req.body,
                password: hashedPass,
                verify_code: Math.floor(10000 + Math.random() * 90000)
            });
            delete user.dataValues.password;
            delete user.dataValues.socket_id;
            let tokens = generate_tokens(user.dataValues);
            return this.success(res, { user, auth: tokens }, "", 200);
        } catch (error) {
            return next(error);
        }
    }
    public codeVerify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            let foundUser: any = await User.findOne({ where: { id: req.user.id } });
            console.log(foundUser.dataValues.verify_code, req.body.verification_code)
            if (!foundUser) return this.failed(res, {}, "user not found");
            if (!foundUser.dataValues.verify_code)
                return this.success(res, {}, "already verified.")
            if (foundUser.dataValues.verify_code !== req.body.verification_code)
                return this.failed(res, {}, "wrong verification code.", 200);
            // @ts-ignore
            await User.update({ verify_code: null }, { where: { id: req.user.id } })
            delete foundUser.dataValues.password;
            delete foundUser.dataValues.socket_id;
            return this.success(res, foundUser, "user verified successfully");
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