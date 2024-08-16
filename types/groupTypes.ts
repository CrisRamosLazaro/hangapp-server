import { Document, Types } from 'mongoose'
import { IChatMsg } from './chatMsgTypes'

export interface IGroup extends Document {
    name: string
    description: string
    owner: Types.ObjectId
    members: string[]
    chatHistory: IChatMsg[]
}