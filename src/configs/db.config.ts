import { Sequelize } from 'sequelize';
import { db } from '../utils/constants';

export const sequelize = new Sequelize(db.DB_NAME, db.DB_USER_NAME, db.DB_PASSWORD, {
    host: db.DB_HOST_NAME,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        useUTC: false
    },
    timezone: '+05:30'
});

