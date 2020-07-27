import { STRING, ENUM } from 'sequelize'
import { sequelize } from '../configs/db.config'
export const SocialAuth = sequelize.define('social_auth', {
    keyId: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    provider: {
        type: ENUM("GOOGLE", "FACEBOOK", "APPLE"),
        allowNull: false,
    }
}, {

});


