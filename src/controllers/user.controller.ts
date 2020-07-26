import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { validationResult } from 'express-validator'
export class UserController {

    constructor() { }

    public getUser = async (req: Request, res: Response) => {
        try {
            validationResult(req).throw();
            res.status(200).json(req.body)
        } catch (e) {
            res.status(500).json({ ...e });
        }
    }
}