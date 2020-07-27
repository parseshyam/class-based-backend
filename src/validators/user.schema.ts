import { body, header } from 'express-validator';
import { User } from '../models/user.model'
// alawys sanitizatize the input use trim and escape every for each input 
const registerSchema = [
    body('first_name').trim().escape().isAlpha(),
    body('last_name').trim().escape().isAlpha(),
    body('email').trim().escape().isEmail().normalizeEmail(),
    body('user_name').trim().escape().isAlphanumeric(),
    body('password').trim().isLength({ max: 10, min: 5 }),
]

const loginSchema = [
    body('email').trim().escape().isEmail().normalizeEmail(),
    body('password').trim().isLength({ max: 10, min: 5 }),
]

const codeVerification = [
    body('verification_code').trim().escape().isNumeric().isLength({ min: 5, max: 5 }).toInt(),
]

export default {
    loginSchema,
    registerSchema,
    codeVerification
}