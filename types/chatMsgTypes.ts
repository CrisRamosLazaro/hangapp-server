import { Document, Types } from 'mongoose'

export interface IChatMsg extends Document {
    content: string
    owner: Types.ObjectId
    group: Types.ObjectId
}