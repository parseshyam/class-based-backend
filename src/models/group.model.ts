import { STRING, TEXT } from 'sequelize'
import { sequelize } from '../configs/db.config'
export const Group = sequelize.define('group', {
    group_name: {
        type: STRING,
        allowNull: false
    },
    group_description: {
        type: TEXT,
        defaultValue: "No description added."
    }
}, {

});


