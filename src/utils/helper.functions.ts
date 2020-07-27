import { sign, verify } from 'jsonwebtoken';
import constants from './constants';
import { resolve } from 'dns';
let TOKEN = constants;

export const generate_tokens = (user: object): Promise<object> => {
    return new Promise((resolve, reject) => {

        try {
            let accessToken = sign(user, TOKEN.ACCESS_TOKEN, { expiresIn: TOKEN.ACCESS_EXP });
            let refreshToken = sign(user, TOKEN.REFRESH_TOKEN, { expiresIn: TOKEN.REFRESH_EXP });
            resolve({
                accessToken,
                refreshToken,
                token_type: TOKEN.TYPE,
                expiresIn: TOKEN.ACCESS_EXP
            });
        } catch (error) {
            reject(error);
        }
    })
}

export const forgotPassToken = (user: object) => {
    try {
        return sign(user, TOKEN.PASS_TOKEN, { expiresIn: TOKEN.PASS_EXP });
    } catch (error) {
        console.log(error)
        return error.message;
    }
}

export const verifyToken = (token: string) => {
    return new Promise((resolve, reject) => {
        try {
            let decode = verify(token, TOKEN.PASS_TOKEN);
            resolve(decode);
        } catch (error) {
            reject(error)
        }
    })
}




