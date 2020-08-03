import { Sequelize } from 'sequelize';
import { db } from './keys';

export const sequelize = new Sequelize(db.DB_NAME, db.DB_USER_NAME, db.DB_PASSWORD, {
    host: db.DB_HOST_NAME,
    port: +db.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
        useUTC: false
    },
    query: {
        raw: true
    },
    timezone: db.TIME_ZONE
});


