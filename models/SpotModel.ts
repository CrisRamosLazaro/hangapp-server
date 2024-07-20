import { Schema, model } from 'mongoose'

const spotSchema = new Schema(
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
        category: {
            type: String,
            enum: ['Nightclub', 'Bar', 'Restaurant', 'Theatre', 'Cinema', 'Exhibition', 'Nature', 'Landmark'],
            required: [true, 'Category is required.']
        },
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
            // required: [true, 'Rating is required.']
        },
        userReview: {
            type: String,
            trim: true,
            // required: [true, 'Your review is required.'],
            // minlength: [15, 'The review must have a minimum of 15 characters.']
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

// spotSchema.statics.checkOwnerForPlace = function (userId, placeId) {
//     return this.count({ $and: [{ _id: placeId }, { owner: userId }] })
// }


const Spot = model("Spot", spotSchema)

export default Spot