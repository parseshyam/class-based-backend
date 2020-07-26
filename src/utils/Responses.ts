import { Response } from 'express'
export class Responses {
    constructor() { }
    public success = (res: Response, message: string = "", data: object = {}, status: boolean = true, statusCode: number = 200) => {
        return res.status(statusCode).json({
            status: status,
            message: message,
            value: data
        })
    }
}