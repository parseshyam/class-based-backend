import { body, param } from 'express-validator';
import { validation } from '../utils/messages'
// alawys sanitizatize the input use trim and escape every for each input.

const createUser = [
    body('first_name').trim().escape().isAlpha(),
    body('last_name').trim().escape().isAlpha().optional(),
    body('email').trim().escape().isEmail().normalizeEmail(),
    body('user_name').trim().escape().isAlphanumeric(),
    body('password').trim().isLength({ max: 10, min: 5 }).withMessage(validation.PASSWORD_LENGTH),
]

const updateUser = [
    body('first_name').trim().escape().isAlpha().optional(),
    body('last_name').trim().escape().isAlpha().optional(),
    body('user_name').trim().escape().isAlphanumeric().optional(),
]

const socialLogin = [
    body('first_name').trim().escape().isAlpha(),
    body('last_name').trim().escape().isAlpha().optional(),
    body('email').trim().escape().isEmail().normalizeEmail().optional(),
    body('provider').trim().isIn(["GOOGLE", "FACEBOOK", "APPLE"]),
    body('social_id').trim().isAlphanumeric(),
]

const normalLogin = [
    body('email').trim().escape().isEmail().normalizeEmail(),
    body('password').trim().isLength({ max: 10, min: 5 }).withMessage(validation.PASSWORD_LENGTH),
]

const codeVerification = [
    body('verification_code').trim().escape().isNumeric().isLength({ min: 5, max: 5 }).toInt(),
    body('two_step_auth').isBoolean().optional()
]


const forgotPassword = [
    body('email').trim().escape().isEmail().normalizeEmail(),
]
const resetPass = [
    body('passwordConfirmation').trim().isLength({ max: 10, min: 5 }).withMessage(validation.PASSWORD_LENGTH),
    body('password').trim().isLength({ max: 10, min: 5 }).withMessage(validation.PASSWORD_LENGTH).custom((val, { req, }) => {
        if (val !== req.body.passwordConfirmation) throw new Error(validation.CONFIRM_MISSMATCH);
        return true
    }),
]

export default {
    normalLogin,
    resetPass,
    createUser,
    updateUser,
    socialLogin,
    forgotPassword,
    codeVerification
}