import { STRING, ENUM } from 'sequelize'
import { sequelize } from '../configs/db.config';

export const Profile = sequelize.define('profile', {
    using_for: {
        type: STRING,
        allowNull: false
    },
    first_name: {
        type: STRING,
        allowNull: false
    },
    last_name: {
        type: STRING,
        allowNull: false
    },
    profile_pic: {
        type: STRING,
        defaultValue: null,
        allowNull: true,
    },
    gender: {
        type: ENUM("MALE", "FEMALE", "OTHER"),
        defaultValue: null,
        allowNull: true
    },
    dob: {
        type: STRING,
        defaultValue: null,
        allowNull: true
    },
    height: {
        type: STRING,
        defaultValue: null,
        allowNull: true
    },
    weight: {
        type: STRING,
        defaultValue: null,
        allowNull: true
    }
}, {

});


