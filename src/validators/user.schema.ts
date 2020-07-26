import { body } from 'express-validator';

const loginSchema = [
    body('email')
        .exists().withMessage('user name is required!')
        .bail()
        .isEmail()
        .normalizeEmail(),
    body('text')
        .exists().withMessage('text is required!')
        .trim()
        .escape(),
]

export default {
    loginSchema
}