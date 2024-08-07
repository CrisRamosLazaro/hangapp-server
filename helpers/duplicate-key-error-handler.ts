import { Request, Response, NextFunction } from 'express'

export interface MongoError extends Error {
    code?: number
    keyPattern?: { [key: string]: any }
}

export const handleDuplicateKeyError = (err: MongoError, req: Request, res: Response, next: NextFunction) => {

    if (err.code === 11000 && err.keyPattern) {

        const field = Object.keys(err.keyPattern)[0]
        const message = `${field}_already_exists`

        return res.status(409).json({
            error: "Conflict",
            field: field,
            message
        })
    } else {
        next(err)
    }
}