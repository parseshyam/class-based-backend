import { TEXT } from 'sequelize'
import { sequelize } from '../configs/db.config'
export const PrivateMessage = sequelize.define('private_message', {
    message: {
        type: TEXT,
        allowNull: false
    },
}, {

});


