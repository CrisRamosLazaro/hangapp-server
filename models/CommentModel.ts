import { Schema, model } from "mongoose"
import { IComment } from "@/types/commentTypes"

const commentSchema = new Schema<IComment>(
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
    },
    {
        timestamps: true
    }
)

const Comment = model("Comment", commentSchema)

export default Comment