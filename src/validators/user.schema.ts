import { body } from 'express-validator';
import { User } from '../models/user.model'
// alawys sanitizatize the input use trim and escape every for each input 
const registerSchema = [
    body('first_name').trim().escape().isAlpha(),
    body('last_name').trim().escape().isAlpha(),
    body('email').trim().escape().isEmail().normalizeEmail().custom(value => {
        return User.findOne({ where: { email: value } }).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        })
    }),
    body('enroll').trim().escape().isNumeric(),
    body('phone_number').trim().escape().isNumeric().isLength({ max: 10, min: 10 }),
    body('password').trim().isLength({ max: 10, min: 5 }), body('profile_picture').optional().trim(),
    body('role').trim().escape().optional(),
]

const loginSchema = [
    body('email').trim().escape().isEmail().normalizeEmail(),
    body('password').trim().isLength({ max: 10, min: 5 }),
]

export default {
    loginSchema,
    registerSchema
}