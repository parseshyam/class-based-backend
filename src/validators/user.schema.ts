import { body, param } from 'express-validator';

// alawys sanitizatize the input use trim and escape every for each input 
const loginSchema = [
    body('email')
        .trim()
        .escape()
        .isEmail()
        .normalizeEmail(),
    body('text')
        .trim()
        .escape(),
    param('hello')
        .trim()
        .escape()
        // .isNumeric()

]

export default {
    loginSchema
}