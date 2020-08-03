import { sign } from 'jsonwebtoken';
import { token } from '../configs/keys';

export const generate_tokens = (user: object): Promise<object> => {
    return new Promise((resolve, reject) => {
        try {
            let accessToken = sign(user, token.ACCESS_TOKEN, { expiresIn: token.ACCESS_EXP });
            let refreshToken = sign(user, token.REFRESH_TOKEN, { expiresIn: token.REFRESH_EXP });
            resolve({
                accessToken,
                refreshToken,
                token_type: token.TYPE,
                token_exp: Date.parse(Date()) + parseInt(token.ACCESS_EXP) * 24 * 60 * 60 * 1000
            });
        } catch (error) {
            reject(error)
        }
    })
}

export const randomCode = () => {
    // this will return random 5 digit code.
    // which will be used as user confirmation 
    return Math.floor(10000 + Math.random() * 90000)
}



// this helper function will return first and last day of :-
// currrent_month, currrent_week, today or any selected_date 
export const getFirstLastDate = (sortBy: any): Promise<{ gt: Date, lt: Date }> => {
    let date = new Date();
    let gt: any = null;
    let lt: any = null;
    return new Promise((resolve, reject) => {
        if (sortBy) {
            if (sortBy === 'current-week') {
                gt = new Date(date.setDate(date.getDate() - date.getDay())).setHours(0, 0, 0, 0);
                lt = new Date(date.setDate(date.getDate() - date.getDay() + 6)).setHours(23, 59, 59, 0);
            } else if (sortBy === 'current-month') {
                gt = new Date(date.getFullYear(), date.getMonth(), 1).setHours(0, 0, 0, 0);
                lt = new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(23, 59, 59, 0);
            } else {
                let anyDate: any = sortBy;
                let date = new Date(anyDate);
                // @ts-ignore
                if (date instanceof Date && !isNaN(date)) {
                    gt = date.setHours(0, 0, 0, 0);
                    lt = date.setHours(23, 59, 59, 0);
                } else {
                    let error: any = new Error('Please enter valid date in format yyyy-mm-dd');
                    error.statusCode = 400;
                    reject(error)
                }
            }
            resolve({ gt, lt });
        } else {
            gt = date.setHours(0, 0, 0, 0);
            lt = date.setHours(23, 59, 59, 0);
            resolve({ gt, lt });
        }
    })
}


