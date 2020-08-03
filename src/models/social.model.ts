import { STRING, ENUM } from 'sequelize';
import { sequelize } from '../configs/db.config';

export const Social = sequelize.define('social', {
    social_id: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    provider: {
        type: ENUM("GOOGLE", "FACEBOOK", "APPLE"),
        allowNull: false
    }
}, {

});


