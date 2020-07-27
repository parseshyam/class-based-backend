import { Response } from 'express'
export class Responses {
    constructor() { }
    public success = (res: Response, data: object = {}, message: string = "", statusCode: number = 200, status: boolean = true ) => {
        return res.status(statusCode).json({
            status: status,
            message: message,
            value: data
        })
    }
}