import { User } from './user.model';
import { Social } from './social.model';
import { Profile } from './user.profile';
import { UserRestriction } from './user_restrictions.model';
import { FoodDiary } from './food_diary';

/**@Static_Models  */
import { FoodRestrict } from './static.models.ts/food_restrictions'

/**@Static_Models */

User.hasOne(Profile, { sourceKey: "id", foreignKey: "user_id", onDelete: "CASCADE" })
User.hasMany(Social, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(FoodDiary, { foreignKey: 'user_id', onDelete: "CASCADE" });
// user has many restrictions which combines to one wig-wag card.
User.hasMany(UserRestriction, { foreignKey: "user_id", onDelete: "CASCADE" });
// !!WARNING THE FORCE -> TRUE WILL DELETE THE WHOLE TABLE.
(async () => {
    // await User.sync({ force: false })
    // await Social.sync({ force: false })
    // await Profile.sync({ force: false })
    // await UserRestriction.sync({ force: false })
    // await FoodDiary.sync({ force: false })
})();

// TO TRUNCATE ALL STATIC CONTENT UNCOMMENT AND PASS FORCE FLAG TRUE.
// (async () => {
//     await FoodRestrict.sync({ force: false });
// })();


