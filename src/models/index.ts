import { sequelize } from '../configs/db.config'
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

User.sync({ force: false });
Group.sync({ force: false });
GroupMember.sync({ force: false });
GroupMessage.sync({ force: false });
PrivateMessage.sync({ force: false });

sequelize.sync({ force: false });
sequelize.authenticate()
    .then(() => console.log('connected successfully'))
    .catch(error => console.log(error))


