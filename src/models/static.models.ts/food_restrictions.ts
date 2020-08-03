import { STRING, JSON, ARRAY } from 'sequelize';
import { sequelize } from '../../configs/db.config';

export const FoodRestrict = sequelize.define('food_restriction', {
    name: {
        type: STRING,
        allowNull: false
    },
    place_holder: {
        type: ARRAY(STRING),
        allowNull: true
    },
    data: {
        type: ARRAY(JSON),
        allowNull: true
    }
}, {

});


