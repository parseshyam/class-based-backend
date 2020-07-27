import { User } from './user.model';
import { PrivateMessage } from './private_message.model';


User.hasMany(PrivateMessage, { foreignKey: 'sender_id' });
User.hasMany(PrivateMessage, { foreignKey: 'receiver_id' });

// !!WARNING THE FORCE -> TRUE WILL DELETE THE WHOLE TABLE.
// (async () => {
//     await User.sync({ force: false })
//     await PrivateMessage.sync({ force: false })
// })();



