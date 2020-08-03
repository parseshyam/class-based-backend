import { body,query } from 'express-validator';
import { validation } from '../utils/messages'
// alawys sanitizatize the input use trim and escape every for each input.

const getFoodDiary = [
    query('sortBy').trim()
]

const createFoodDiary = [
    body('meal_of_day').trim().escape().isAlpha(),
    body('meal_name').trim().exists(),
    body('serving_size').trim().escape().isNumeric(),
    body('time').trim(),
    body('ingredients').isArray().optional(),
    body('notes').isArray().optional(),
]
const updateFoodDiary = [
    body('food_id').trim().toInt().isNumeric(),
    body('meal_of_day').trim(),
    body('meal_name').trim().exists(),
    body('serving_size').trim().escape().isNumeric(),
    body('time').trim(),
    body('ingredients').isArray().optional(),
    body('notes').isArray().optional(),
]

const deleteFoodDiary = [
    body('food_id').trim().toInt().isNumeric(),
]

export default {
    deleteFoodDiary,
    createFoodDiary,
    updateFoodDiary,
    getFoodDiary,
}