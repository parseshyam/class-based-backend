import { Request, Response, NextFunction } from 'express';
import { Responses } from '../utils/Response';
import { Profile } from '../models/user.profile';
import { User } from '../models/user.model';
import { UserRestriction } from '../models/user_restrictions.model'
import { profile as PROFILE, user as USER } from '../utils/messages'

export class ProfileController extends Responses {

    public getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND, 404);
            if (!foundUser.verified_email) return this.failed(res, {}, USER.REGISTERED_NOT_VERIFIED)
            const profile = await Profile.findOne({
                attributes: { exclude: PROFILE.EXCLUDE },
                //@ts-ignore
                where: { user_id: req.user.id }
            });
            if (!profile) return this.failed(res, {}, PROFILE.NOT_FOUND, 404);
            const wigwag = await UserRestriction.findAndCountAll({
                attributes: {
                    exclude: PROFILE.EXCLUDE
                },
                where: {
                    user_id: foundUser.id
                }
            });
            return this.success(res, { profile, wigwag: wigwag }, PROFILE.FOUND);
        } catch (error) {
            next(error)
        }
    }

    public createUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { first_name, last_name } = req.body
            //@ts-ignore
            const foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND, 404);
            if (!foundUser.verified_email) return this.failed(res, {}, USER.REGISTERED_NOT_VERIFIED);
            //@ts-ignore
            const profileExists = await Profile.findOne({ where: { user_id: req.user.id } });
            //@ts-ignore
            if (!profileExists) await Profile.create({ user_id: req.user.id, ...req.body });
            //@ts-ignore
            await Profile.update({ ...req.body }, { where: { user_id: req.user.id } })
            //@ts-ignore
            first_name && last_name && await User.update({ first_name, last_name }, { where: { id: req.user.id } });
            return this.success(res, { profile: req.body }, PROFILE.ADDED);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND, 404);
            //@ts-ignore
            await Profile.destroy({ where: { user_id: req.user.id } })
            return this.success(res, {}, PROFILE.DELETED);
        } catch (error) {
            next(error)
        }
    }

    public getWigWagCard = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND, 404);
            if (!foundUser.verified_email) return this.failed(res, {}, USER.REGISTERED_NOT_VERIFIED);
            const wigwag = await UserRestriction.findAndCountAll({
                where: {
                    user_id: foundUser.id
                }
            });
            if (!wigwag) return this.failed(res, {}, PROFILE.WIGWAG_NOT_FOUND, 200);
            return this.success(res, { wigwag }, PROFILE.WIGWAG_FOUND);
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public createUpdateWigWagCard = async (req: Request, res: Response, next: NextFunction) => {
        const { restriction_id } = req.body;
        try {
            // @ts-ignore
            const foundUser: any = await User.findOne({ where: { id: req.user.id } });
            if (!foundUser) return this.failed(res, {}, USER.NOT_FOUND, 404);
            if (!foundUser.verified_email) return this.failed(res, {}, USER.REGISTERED_NOT_VERIFIED);
            const foundRestriction = await UserRestriction.findOne({
                where: {
                    user_id: foundUser.id,
                    restriction_id
                }
            })
            if (!foundRestriction) {
                const created = await (await UserRestriction.create({ user_id: foundUser.id, ...req.body })).toJSON();
                return this.success(res, { created }, `${req.body.name} ${PROFILE.RESTRICTION_ADDED}`)
            } else {
                delete req.body.restriction_id
                const created = await UserRestriction.update({
                    ...req.body
                }, {
                    where: {
                        user_id: foundUser.id,
                        restriction_id
                    }
                })
                return this.success(res, { created }, `${PROFILE.WIGWAG_UPDATE} ${req.body.name}`)
            }
        } catch (error) {
            next(error)
        }
    }

    public shareWigWagCard = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) {
            next(error)
        }
    }
}