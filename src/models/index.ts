import { User } from './user.model';
import { Group } from './group.model';
import { GroupMember } from './group_member.model';
import { GroupMessage } from './group_message.model';
import { PrivateMessage } from './private_message.model';

User.hasMany(Group, { foreignKey: 'user_id', });
User.hasMany(GroupMessage, { foreignKey: 'sender_id' })
User.hasMany(PrivateMessage, { foreignKey: 'sender_id' });
User.hasMany(PrivateMessage, { foreignKey: 'receiver_id' });
User.hasMany(GroupMember, { foreignKey: 'user_id' })
Group.hasMany(GroupMessage, { foreignKey: 'group_id' })
Group.hasMany(GroupMember, { foreignKey: 'group_id' });

// !!WARNING THE FORCE -> TRUE WILL DELETE THE WHOLE TABLE.
// (async () => {
//     await User.sync({ force: false })
//     await Group.sync({ force: false })
//     await GroupMember.sync({ force: false })
//     await GroupMessage.sync({ force: false })
//     await PrivateMessage.sync({ force: false })
// })();



