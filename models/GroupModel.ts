import { Schema, model } from "mongoose"
import { IGroup } from "@/types/groupTypes"

const groupSchema = new Schema<IGroup>(
    {
        name: {
            type: String,
            required: [true, 'group name is mandatory'],
            minlength: [10, 'The group name must have a minimum of 10 characters.'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'group description is mandatory'],
            minlength: [30, 'The group description must have a minimum of 30 characters.'],
            trim: true
        },
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        members: [{
            ref: 'User',
            type: Schema.Types.ObjectId
        }],
        chatHistory: [{
            ref: 'ChatMsg',
            type: Schema.Types.ObjectId
        }],
        spots: [{
            ref: 'Spot',
            type: Schema.Types.ObjectId
        }],
    },
    {
        timestamps: true
    }
)

const Group = model("Group", groupSchema)

export default Group