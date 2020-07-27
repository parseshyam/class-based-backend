import { sign } from 'jsonwebtoken';
import constants from './constants';
let { ACCESS_TOKEN, REFRESH_TOKEN } = constants;

export const generate_tokens = (user: any): object => {
    try {
        let accessToken = sign(user, ACCESS_TOKEN, { expiresIn: '1d' });
        let refreshToken = sign(user, REFRESH_TOKEN, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken,
            token_type: 'Bearer',
            expiresIn: '1d'
        };
    } catch (error) {
        console.log(error)
        return error.message;
    }
}





