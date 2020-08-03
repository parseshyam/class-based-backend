import { body } from 'express-validator';
import { validation } from '../utils/messages'
// alawys sanitizatize the input use trim and escape every for each input.

const userProfile = [
    body('using_for').trim().escape().isAlpha(),
    body('first_name').trim().escape().isAlpha(),
    body('last_name').trim().escape().isAlpha(),
    body('gender').trim().escape().isIn(["MALE", "FEMALE", "OTHER"]).optional(),
    body('dob').trim().optional(),
    body('height').trim().escape().optional(),
    body('weight').trim().escape().optional(),
]

const wigWag = [
    body('restriction_id').trim().escape().isNumeric(),
    body('name').trim().escape().exists(),
    body('content').optional(),
    body('data').optional(),
]

export default {
    wigWag,
    userProfile
}