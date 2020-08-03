import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'
import { token } from '../configs/keys'
import { validation, errors } from '../utils/messages';
export class Middleware {

    constructor() { }

    public valid = (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) return next();
            const error: any = new Error(validation.VALIDATION_ERROR);
            error.statusCode = 200;
            error.data = errors.array()
            next(error)
        } catch (error) {
            next(error)
        }
    }

    public Auth = (req: Request, res: Response, next: NextFunction) => {
        try {
            let authorization = req.headers['authorization'];
            if (!authorization) throw new Error(errors.MISSING_HEADER);
            let accessToken = authorization.split(' ')[1];
            if (!accessToken) throw new Error(errors.UNAUTH_ACCESS);
            let decode = verify(accessToken, token.ACCESS_TOKEN);
            // @ts-ignore
            req['user'] = decode;
            next();
        } catch (error) {
            error.statusCode = 401
            next(error)
        }
    }
}