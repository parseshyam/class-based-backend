import { config } from 'dotenv';
config();

declare let process: { env: { [key: string]: string } };

export const PORT = process.env.PORT || 7000;

export const db = {
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER_NAME: process.env.DB_USER_NAME,
    DB_HOST_NAME: process.env.DB_HOST_NAME,
    TIME_ZONE: process.env.TIME_ZONE
}

export const token = {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    PASS_TOKEN: process.env.PASS_TOKEN,
    PASS_EXP: '1d',
    TYPE: 'Bearer',
    ACCESS_EXP: '10d', //keep in days or make sure to change exp_time while generating token
    REFRESH_EXP: '30d',
}
