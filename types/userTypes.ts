import { Document } from 'mongoose'

export interface IUser extends Document {
    email: string
    password: string
    firstName?: string
    lastName?: string
    avatar: string
    role: 'ADMIN' | 'ORGANIZER' | 'MEMBER'
    signToken: () => string
    validatePassword: (candidatePassword: string) => boolean
}