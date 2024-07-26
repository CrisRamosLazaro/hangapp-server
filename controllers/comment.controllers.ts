import { Request, Response, NextFunction } from 'express'
import Comment from '@/models/CommentModel'
import Spot from '@/models/SpotModel'

const createComment = async (req: Request, res: Response, next: NextFunction) => {

    const { content, owner, spotId } = req.body

    try {
        const newComment = await Comment.create({ content, owner })
        await Spot.findByIdAndUpdate(
            spotId,
            { $push: { comments: newComment._id } },
            { new: true }
        )
        res.status(201).json(newComment)

    } catch (err) {
        console.error(err)
        next(err)
    }
}

const getAllComments = async (req: Request, res: Response, next: NextFunction) => {

    const { spot_id } = req.params

    try {
        const response = await Spot
            .findById(spot_id)
            .populate({
                path: "comments",
                populate: {
                    path: "owner",
                    model: "User"
                }
            })
        if (!response) {
            return res.status(404).json({ message: 'Spot not found' })
        }
        res.json(response.comments)

    } catch (err) {
        console.error(err)
        next(err)
    }
}

export {
    createComment,
    getAllComments
}