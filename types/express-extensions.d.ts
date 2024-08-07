import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            payload?: any
            authError?: {
                name: string
                message: string
            }
        }
    }
}