import { Request, Response, NextFunction } from 'express'
import Comment from '@/models/CommentModel'
import Spot from '@/models/SpotModel'

const createComment = (req: Request, res: Response, next: NextFunction) => {

    const { content, owner } = req.body

    Comment
        .create({ content, owner })
        .then(response => res.status(201).json(response))
        .catch(err => next(err))
}

export {
    createComment
}