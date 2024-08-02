import { Document, Types } from 'mongoose'

export interface ISpot extends Document {
    name: string
    description?: string
    spotImg?: string
    photoOptions?: string[]
    categories: ('Nightclub' | 'Bar' | 'Restaurant' | 'Theatre' | 'Cinema' | 'Exhibition' | 'Nature' | 'Landmark')[]
    phone?: string
    openHours?: string[]
    address?: {
        city?: string
        streetAddress?: string
        location?: {
            type?: string
            coordinates?: number[]
        }
    }
    userRating: number
    userReview: string
    owner: Types.ObjectId
    comments?: Types.ObjectId[]
    createdAt: Date
    updatedAt?: Date
}