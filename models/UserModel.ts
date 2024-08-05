import { Schema, model } from 'mongoose'
import { IUser } from '../types/userTypes'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [3, 'The length must be at least 3 characters']
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        default: 'https://medvirturials.com/img/default-image.png'
    },
    role: {
        type: String,
        default: 'MEMBER',
        enum: ['ADMIN', 'ORGANIZER', 'MEMBER']
    },
    faveSpots: [
        {
            ref: "Spot",
            type: Schema.Types.ObjectId
        }
    ]

}, {
    timestamps: true
})


userSchema.pre<IUser>('save', async function (next) {

    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.signToken = function (): string {
    const { _id, email, role } = this
    const payload = { _id, email, role }

    let secret: string = process.env.TOKEN_SECRET as string

    const authToken = jwt.sign(
        payload,
        secret,
        { algorithm: 'HS256', expiresIn: "6h" }
    )
    return authToken
}

userSchema.methods.validatePassword = function (candidatePassword: string) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

// userSchema.statics.checkOwnerForUser = function (userId: string, profileId: string): Promise<number> {
//     return this.countDocuments({ $and: [{ _id: userId }, { _id: profileId }] })
// }

userSchema.index({ faveSpot: 1 })

const User = model<IUser>('User', userSchema)

export default User