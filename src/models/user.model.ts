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
    enroll: {
        type: INTEGER,
        unique: true,
        allowNull: false
    },
    phone_number: {
        type: BIGINT,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    },
    profile_picture: {
        type: TEXT,
        defaultValue: null
    },
    is_blocked: {
        type: BOOLEAN,
        defaultValue: false
    },
    associated_groups: {
        type: ARRAY(INTEGER)
    },
    socket_id: {
        type: STRING,
        defaultValue: null
    },
    role: {
        type: ENUM("USER","ADMIN", "STAFF"),
        defaultValue: "USER"
    }
}, {

});


