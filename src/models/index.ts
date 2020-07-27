import { User } from './user.model';
import { PrivateMessage } from './private_message.model';
import { SocialAuth } from './social_auth.model'

User.hasMany(PrivateMessage, { foreignKey: 'sender_id' });
User.hasMany(PrivateMessage, { foreignKey: 'receiver_id' });
User.hasMany(SocialAuth, { foreignKey: 'userId', onDelete: 'CASCADE' });

// !!WARNING THE FORCE -> TRUE WILL DELETE THE WHOLE TABLE.
// (async () => {
//     await User.sync({ force: false })
//     await PrivateMessage.sync({ force: false })
// })();



