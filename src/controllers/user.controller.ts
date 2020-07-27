import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils/Responses';
import { User } from '../models/user.model';
import { hash, compare } from 'bcrypt'
import { generate_tokens } from '../utils/helper.functions';
export class UserController extends Responses {

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { password, email } = req.body;
            let foundUser: any = await User.findOne({ where: { email } });
            if (foundUser) {
                if (!foundUser.dataValues.verify_code) return this.failed(res, {}, "already registered", 200)
                else {
                    delete foundUser.dataValues.password;
                    delete foundUser.dataValues.socket_id;
                    let tokens = generate_tokens(foundUser.dataValues);
                    return this.success(res, { user: foundUser, auth: tokens }, "", 200);
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

    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            let foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, "user not found");
            delete foundUser.dataValues.password;
            delete foundUser.dataValues.socket_id;
            delete foundUser.dataValues.verify_code;
            return this.success(res, { user: foundUser }, "user found");
        } catch (error) {
            next(error);
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        return this.success(res, { ...req.body });
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        return this.success(res, { ...req.body });
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
                return this.failed(res, {}, "wrong verification code", 200);
            // @ts-ignore
            await User.update({ verify_code: null }, { where: { id: req.user.id } })
            delete foundUser.dataValues.password;
            delete foundUser.dataValues.socket_id;
            return this.success(res, { user: foundUser }, "user verified successfully");
        } catch (error) {
            next(error);
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        let { email, password } = req.body
        try {
            let foundUser: any = await User.findOne({ where: { email } });
            if (!foundUser) return this.failed(res, {}, "user not found");
            let checkPass = await compare(password, foundUser.dataValues.password);
            if (!checkPass) return this.failed(res, {}, "wrong password", 200);
            if (foundUser.dataValues.two_step_auth) {
                let verify_code = Math.floor(10000 + Math.random() * 90000);
                return this.success(res, { verify: true, code: verify_code }, "user found");
            }
            delete foundUser.dataValues.password;
            delete foundUser.dataValues.socket_id;
            delete foundUser.dataValues.verify_code;
            return this.success(res, { verify: false, code: null }, "user found");
        } catch (error) {
            return next(error)
        }
    }

    public forgotPass = async (req: Request, res: Response, next: NextFunction) => {
        let { email } = req.body;
        console.log(req.params);
        try {
            let foundUser: any = await User.findOne({ where: { email } });
            if (!foundUser) return this.failed(res, {}, "user not found");
            let verify_code = Math.floor(10000 + Math.random() * 90000);
            delete foundUser.dataValues.password;
            delete foundUser.dataValues.socket_id;
            return this.success(res, { verify: true, code: verify_code }, "user found");
        } catch (error) {
            return next(error)
        }
    }
}