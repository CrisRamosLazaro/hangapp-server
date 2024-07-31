import { Schema, model } from 'mongoose'
import { ISpot } from '@/types/spotTypes'
import Comment from './CommentModel'
import User from './UserModel'

const spotSchema = new Schema<ISpot>(
    {
        name: {
            type: String,
            required: [true, 'Name is required.']
        },
        description: {
            type: String
        },
        spotImg: {
            type: String
        },
        photoReference: [
            String
        ],
        categories: [{
            type: String,
            enum: ['Nightclub', 'Bar', 'Restaurant', 'Theatre', 'Cinema', 'Exhibition', 'Nature', 'Landmark'],
            required: [true, 'Category is required.']
        }],
        phone: {
            type: String
        },
        openHours: [
            String
        ],
        address: {
            type: {
                city: String,
                streetAddress: String,
                location: {
                    type: {
                        type: String
                    },
                    coordinates: [Number]
                },
            }
        },
        userRating: {
            type: Number,
            required: [true, 'Rating is required.'],
            default: 0
        },
        userReview: {
            type: String,
            trim: true,
            required: [true, 'Your review is required.'],
            minlength: [15, 'The review must have a minimum of 15 characters.']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            }
        ]

    },
    {
        timestamps: true
    }
)

spotSchema.pre('findOneAndDelete', async function (next) {
    const spot = await this.model.findOne(this.getQuery())
    if (spot) {
        await Comment.deleteMany({ _id: { $in: spot.comments } })

        await User.updateMany(
            {},
            { $pull: { faveSpots: spot._id } }
        )
    }
    next()
})

// spotSchema.statics.checkOwnerForPlace = function (userId, placeId) {
//     return this.count({ $and: [{ _id: placeId }, { owner: userId }] })
// }


const Spot = model("Spot", spotSchema)

export default Spot