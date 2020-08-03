import { body, param } from 'express-validator';
// alawys sanitizatize the input use trim and escape every for each input.

const foodRestriction = [
    body('name').trim().exists(),
    body('place_holder').isArray(),
    body('data').isArray(),
]

const getFoodRestrictions = [
    param('count').toInt().custom(val => {
        if (val >= 1) return true;
        return false;
    }),
    param('page').toInt().custom(val => {
        if (val >= 1) return true;
        return false;
    }),
]

export default {
    getFoodRestrictions,
    foodRestriction
}

