import { Request as ExpressRequest } from 'express'

export interface Request extends ExpressRequest {
    payload?: any
    authError?: {
        name: string
        message: string
    }
}