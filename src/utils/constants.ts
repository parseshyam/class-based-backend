import { config } from 'dotenv';
config();
declare let process: { env: { [key: string]: string } };

export default {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    ACCESS_EXP: '10d',
    REFRESH_EXP: '1d',
}
