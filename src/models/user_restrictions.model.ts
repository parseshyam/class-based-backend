import { STRING, ARRAY, JSON, INTEGER } from 'sequelize'
import { sequelize } from '../configs/db.config';

export const UserRestriction = sequelize.define('user_restriction', {
    restriction_id: {
        type: INTEGER,
        unique: true,
        allowNull: false
    },
    name: {
        type: STRING,
        allowNull: false
    },
    content: {
        type: ARRAY(STRING),
        defaultValue: null,
        allowNull: true,
    },
    data: {
        type: ARRAY(JSON),
        defaultValue: null,
        allowNull: true,
    }
}, {

});


