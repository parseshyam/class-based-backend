import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils/Response';
import { User } from '../models/user.model';
import { hash, compare } from 'bcrypt'
import { generate_tokens, randomCode } from '../utils/helper';
import { sequelize } from '../configs/DB.config';
import { Social } from '../models/social.model';
import { Sequelize } from 'sequelize';
import { user as USER } from '../utils/messages'
export class UserController extends Responses {

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { password, email, ...rest } = req.body;
            const foundUser: any = await User.findOne({ where: { email } });
            if (foundUser) {
                if (foundUser.verified_email) return this.failed(res, {}, USER.ALREADY_REGISTERED, 200)
                const hashedPass = await hash(password, 10);
                let updatedUser: any = (await User.update({
                    ...rest,
                    password: hashedPass,
                    verify_code: randomCode()
                }, {
                    where: {
                        id: foundUser.id
                    },
                    returning: true
                }))[1][0];
                delete updatedUser.password;
                delete updatedUser.socket_id;
                const tokens = await generate_tokens(updatedUser);
                return this.success(res, { user: updatedUser, auth: tokens }, "", 200);
            }
            const hashedPass = await hash(password, 10);
            let user: any = await (await User.create({
                ...req.body,
                password: hashedPass,
                verify_code: randomCode()
            })).toJSON();
            delete user.password;
            delete user.socket_id;
            const tokens = await generate_tokens(user);
            // send an email to user.
            return this.success(res, { user, auth: tokens }, "", 200);
        } catch (error) {
            return next(error);
        }
    }

    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            let foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND, 404);
            delete foundUser.password;
            delete foundUser.socket_id;
            delete foundUser.verify_code;
            return this.success(res, { user: foundUser }, USER.FOUND);
        } catch (error) {
            next(error);
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {

    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            let foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND, 404);
            // use cascade delete to delete all user relations.
            await User.destroy({ where: { id: foundUser.id }, cascade: false });
            delete foundUser.password;
            delete foundUser.socket_id;
            delete foundUser.verify_code;
            return this.success(res, { user: foundUser }, USER.DELETED);
        } catch (error) {
            next(error);
        }
    }

    public codeVerify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { two_step_auth = true } = req.body;
            // @ts-ignore
            let foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND, 404);
            if (!foundUser.verify_code)
                return this.success(res, {}, USER.ALREADY_VERIFIED)
            if (foundUser.verify_code !== req.body.verification_code)
                return this.failed(res, {}, USER.WRONG_CODE, 200);
            // @ts-ignore
            await User.update({ verify_code: null, two_step_auth: two_step_auth, verified_email: true }, { where: { id: req.user.id } })
            delete foundUser.password;
            delete foundUser.socket_id;
            delete foundUser.verify_code;
            foundUser.two_step_auth = two_step_auth;
            return this.success(res, { user: foundUser }, USER.VERIFIED);
        } catch (error) {
            next(error);
        }
    }

    public resendCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // @ts-ignore
            let foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND);
            const verify_code = randomCode();
            // send an email to user.
            // @ts-ignore
            await User.update({ verify_code }, { where: { id: req.user.id } });
            delete foundUser.password;
            delete foundUser.socket_id;
            delete foundUser.verify_code;
            foundUser.verify_code = verify_code
            return this.success(res, { user: foundUser }, USER.RESENT_CODE);
        } catch (error) {
            next(error);
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            let foundUser: any = await User.findOne({ where: { email } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND, 404);
            if (!foundUser.verified_email) return this.failed(res, {}, USER.REGISTERED_NOT_VERIFIED, 200);
            if (!foundUser.password) return this.failed(res, {}, USER.ALREDY_SOCIAL_LOGIN, 200);
            const match = await compare(password, foundUser.password);
            if (!match) return this.failed(res, {}, USER.WRONG_PASS, 200);
            delete foundUser.password;
            delete foundUser.socket_id;
            delete foundUser.verify_code;
            const tokens = await generate_tokens(foundUser);
            if (foundUser.two_step_auth === true) {
                // send an email to user.
                const newCode = randomCode();
                await User.update({
                    verify_code: newCode
                }, { where: { id: foundUser.id } });
                foundUser.verify_code = newCode;
                return this.success(res, { user: foundUser, auth: tokens }, "", 200);
            }
            return this.success(res, { user: foundUser, auth: tokens }, USER.LOGIN_SUCCESS);
        } catch (error) {
            next(error);
        }
    }

    public SocialLogin = async (req: Request, res: Response, next: NextFunction) => {
        const t = await sequelize.transaction();
        try {
            let {
                provider,
                social_id,
                first_name,
                last_name = null,
                email = null
            } = req.body;
            if (email) {
                let foundUser: any = await User.findOne({ where: { email } });
                if (foundUser) {
                    const foundSocial: any = await Social.findOne({
                        where: Sequelize.and(
                            { user_id: foundUser.id },
                            { provider: provider },
                            { social_id: social_id }
                        )
                    });
                    if (foundSocial) {
                        delete foundUser?.password;
                        delete foundUser?.socket_id;
                        await t.commit();
                        const tokens = await generate_tokens(foundUser);
                        return this.success(res, { user: foundUser, auth: tokens });
                    } else {
                        try {
                            await Social.create({
                                user_id: foundUser.id,
                                provider: provider,
                                social_id: social_id
                            })
                            delete foundUser?.password;
                            delete foundUser?.socket_id;
                            const tokens = await generate_tokens(foundUser);
                            await t.commit();
                            return this.success(res, { user: foundUser, auth: tokens }, "");
                        } catch (error) {
                            await t.rollback();
                            return next(error)
                        }
                    }
                } else {
                    try {
                        let newUser = await (await User.create({
                            email,
                            last_name,
                            first_name,
                            password: null,
                            user_name: null,
                            verified_email: true,
                            two_step_auth: false,
                        }, { transaction: t })).get();

                        await Social.create({
                            provider,
                            social_id: social_id,
                            user_id: newUser.id,
                        }, { transaction: t });
                        const tokens = await generate_tokens(newUser);
                        delete newUser?.password;
                        delete newUser?.socket_id;
                        await t.commit();
                        return this.success(res, { user: newUser, auth: tokens }, "");
                    } catch (error) {
                        await t.rollback();
                        return next(error)
                    }
                }
            } else {
                const foundSocial: any = await Social.findOne({
                    where: Sequelize.and(
                        { provider: provider },
                        { social_id: social_id },
                    )
                });
                if (foundSocial) {
                    try {
                        let socialUser: any = await User.findOne({ where: { id: foundSocial.user_id } });
                        delete socialUser?.password;
                        delete socialUser?.socket_id;
                        const tokens = await generate_tokens(socialUser);
                        await t.commit();
                        return this.success(res, { user: socialUser, auth: tokens }, "");
                    } catch (error) {
                        await t.rollback();
                        return next(error)
                    }
                } else {
                    try {
                        let newUser = await (await User.create({
                            email,
                            last_name,
                            first_name,
                            password: null,
                            user_name: null,
                            verified_email: true,
                            two_step_auth: false,
                        }, { transaction: t })).get();

                        await Social.create({
                            provider,
                            social_id: social_id,
                            user_id: newUser.id,
                        }, { transaction: t });
                        delete newUser?.password;
                        delete newUser?.socket_id;

                        const tokens = await generate_tokens(newUser);
                        await t.commit();
                        return this.success(res, { user: newUser, auth: tokens }, "");
                    } catch (error) {
                        await t.rollback();
                        return next(error);
                    }
                }
            }
        } catch (error) {
            await t.rollback();
            return next(error);
        }
    }

    public forgotPass = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body;
        try {
            let foundUser: any = await User.findOne({ where: { email } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND);
            const verify_code = randomCode();
            delete foundUser.password;
            delete foundUser.socket_id;
            const token = await generate_tokens(foundUser);
            await User.update({ verify_code: verify_code }, { where: { email } })
            return this.success(res, { verify: true, code: verify_code, token }, USER.FOUND);
        } catch (error) {
            return next(error)
        }
    }

    public resetPass = async (req: Request, res: Response, next: NextFunction) => {
        const { password } = req.body;
        try {
            // @ts-ignore
            const foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND);
            const hashedPass = await hash(password, 10);
            await User.update({ password: hashedPass }, { where: { id: foundUser.id } })
            return this.success(res, {}, USER.PASSWORD_RESET_SUCCESS);
        } catch (error) {
            error.statusCode = 401
            return next(error)
        }
    }

}