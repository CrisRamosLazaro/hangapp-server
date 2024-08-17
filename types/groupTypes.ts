import { Document, Types } from 'mongoose'
import { IChatMsg } from './chatMsgTypes'
import { ISpot } from './spotTypes'

export interface IGroup extends Document {
    name: string
    description: string
    owner: Types.ObjectId
    members: string[]
    chatHistory: IChatMsg[]
    spots: ISpot[]
}