import { verify } from 'jsonwebtoken';
import constants from '../utils/constants';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Responses } from '../utils/Responses';
let { ACCESS_TOKEN } = constants;

export class Middlewares extends Responses {
    constructor() { super() }

    public valid = (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) return next();
            const error: any = new Error('validation error.');
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
            if (!authorization) throw new Error('Authrization Header Missing!');
            let accessToken = authorization.split(' ')[1];
            if (!accessToken) throw new Error('Unauthorized Access!');
            let decode = verify(accessToken, ACCESS_TOKEN);
            // @ts-ignore
            req['user'] = decode;
            next();
        } catch (error) {
            error.statusCode = 401
            next(error)
        }
    }
}