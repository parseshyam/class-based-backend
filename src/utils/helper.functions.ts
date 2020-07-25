import { sign, verify } from 'jsonwebtoken';
import constants from './constants';
import { Request, Response, NextFunction } from 'express';
let { ACCESS_TOKEN, REFRESH_TOKEN } = constants;

export default {

    generate_tokens: (user: any): [string, string] | string => {
        try {
            let accessToken = sign(user, ACCESS_TOKEN, { expiresIn: '1d' });
            let refreshToken = sign(user, REFRESH_TOKEN, { expiresIn: '30d' });
            return [accessToken, refreshToken];
        } catch (error) {
            console.log(error)
            return error.message;
        }
    },

    verify_token: (req: Request, res: Response, next: NextFunction) => {
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
            console.log(error);
            // @ts-ignore
            req['user'] = null;
            next();
        }
    }
}