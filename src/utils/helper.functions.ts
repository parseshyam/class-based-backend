import { sign } from 'jsonwebtoken';
import constants from './constants';
let TOKEN = constants;

export const generate_tokens = (user: object): object => {
    try {
        let accessToken = sign(user, TOKEN.ACCESS_TOKEN, { expiresIn: TOKEN.ACCESS_EXP });
        let refreshToken = sign(user, TOKEN.REFRESH_TOKEN, { expiresIn: TOKEN.REFRESH_EXP });
        return {
            accessToken,
            refreshToken,
            token_type: TOKEN.TYPE,
            expiresIn: TOKEN.ACCESS_EXP
        };
    } catch (error) {
        console.log(error)
        return error.message;
    }
}





