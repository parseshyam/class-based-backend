import { STRING, TEXT, BIGINT, BOOLEAN, INTEGER, ARRAY, ENUM } from 'sequelize'
import { sequelize } from '../configs/db.config'
export const User = sequelize.define('user', {
    first_name: {
        type: STRING,
        allowNull: false
    },
    last_name: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    user_name: {
        type: STRING,
        allowNull: false
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
    }
}, {

});


