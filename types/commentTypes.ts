import { Document, Types } from 'mongoose'

export interface IComment extends Document {
    content: string
    owner: Types.ObjectId
}