import { STRING, BOOLEAN, INTEGER } from 'sequelize'
import { sequelize } from '../configs/db.config';

export const User = sequelize.define('user', {
    first_name: {
        type: STRING,
        allowNull: false
    },
    last_name: {
        type: STRING,
        allowNull: true
    },
    email: {
        type: STRING,
        unique: true,
        allowNull: true,
    },
    user_name: {
        type: STRING,
        allowNull: true
    },
    password: {
        type: STRING,
        allowNull: true
    },
    socket_id: {
        type: STRING,
        defaultValue: null
    },
    verify_code: {
        type: INTEGER,
        defaultValue: null
    },
    two_step_auth: {
        type: BOOLEAN,
        defaultValue: true
    },
    verified_email: {
        type: BOOLEAN,
        defaultValue: false
    }
}, {

});


