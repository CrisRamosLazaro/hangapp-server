import { Document, Types } from 'mongoose'

export interface IUser extends Document {
    email: string
    password: string
    firstName?: string
    lastName?: string
    avatar: string
    role: 'ADMIN' | 'ORGANIZER' | 'MEMBER'
    faveSpots: Types.ObjectId[]
    signToken: () => string
    validatePassword: (candidatePassword: string) => boolean
}