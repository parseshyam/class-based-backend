import { STRING, JSONB, INTEGER, ARRAY } from 'sequelize';
import { sequelize } from '../configs/db.config';

export const FoodDiary = sequelize.define('food_diary', {
    meal_of_day: {
        type: STRING,
        allowNull: false
    },
    meal_name: {
        type: STRING,
        allowNull: false
    },
    serving_size: {
        type: INTEGER,
        allowNull: false
    },
    time: {
        type: STRING,
        allowNull: false
    },
    ingredients: {
        type: ARRAY(JSONB),
        defaultValue: null,
        allowNull: true
    },
    notes: {
        type: ARRAY(STRING),
        defaultValue: null,
        allowNull: true
    }
}, {

});


