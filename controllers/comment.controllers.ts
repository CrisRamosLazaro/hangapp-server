import { Request, Response, NextFunction } from 'express'
import Comment from '@/models/CommentModel'
import Spot from '@/models/SpotModel'

const createComment = async (req: Request, res: Response, next: NextFunction) => {

    const { content, owner, spotId } = req.body

    try {
        const newComment = await Comment.create({ content, owner })
        await Spot.findByIdAndUpdate(spotId, { $push: { comments: newComment._id } }, { new: true })
        res.status(201).json(newComment)
    } catch (err) {
        console.error(err)
        next(err)
    }
}

export {
    createComment
}