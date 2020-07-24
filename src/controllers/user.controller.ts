import { Request, Response } from 'express';

export class UserController {

    constructor() { }

    public getUser = async (req: Request, res: Response) => {
        try {
            res.status(200).json({
                hello: 'hello'
            })
        } catch (error) {

        }
    }
}