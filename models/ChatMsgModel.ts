import { Schema, model } from "mongoose"
import { IChatMsg } from "@/types/chatMsgTypes"

const chatMsgSchema = new Schema<IChatMsg>(
    {
        content: {
            type: String,
            required: [true, 'Comment is mandatory'],
            trim: true
        },
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        group: {
            ref: 'Group',
            type: Schema.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
)

const ChatMsg = model("ChatMsg", chatMsgSchema)

export default ChatMsg