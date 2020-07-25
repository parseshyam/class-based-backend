import { config } from 'dotenv';
config();
declare let process: { env: { [key: string]: string } };

export const db = {
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER_NAME: process.env.DB_USER_NAME,
    DB_HOST_NAME: process.env.DB_HOST_NAME,
    TIME_ZONE: process.env.TIME_ZONE
}

export default {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    ACCESS_EXP: '10d',
    REFRESH_EXP: '1d',
}
