import { TEXT } from 'sequelize'
import { sequelize } from '../configs/db.config'
export const GroupMessage = sequelize.define('group_message', {
    message: {
        type: TEXT,
        allowNull: false
    },
}, {

});


