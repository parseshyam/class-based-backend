import { Response } from 'express'
export class Responses {
    constructor() { }
    public success = (res: Response, data: object = {}, message: string = "", status: boolean = true, statusCode: number = 200) => {
        return res.status(statusCode).json({
            status: status,
            message: message,
            value: data
        })
    }
}