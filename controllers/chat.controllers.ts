import { Request, Response, NextFunction } from 'express'
import ChatMsg from '@/models/ChatMsgModel'
import Group from '@/models/GroupModel'

const createChatMsg = async (req: Request, res: Response, next: NextFunction) => {

    const { content, owner } = req.body
    const { group_id } = req.params

    try {
        const newChatMsg = await ChatMsg.create({ content, owner, group: group_id })
        await Group.findByIdAndUpdate(
            group_id,
            { $push: { chatHistory: newChatMsg._id } },
            { new: true }
        )
        res.status(201).json(newChatMsg)

    } catch (err) {
        console.error(err)
        next(err)
    }
}

const getAllChatMsgs = async (req: Request, res: Response, next: NextFunction) => {

    const { group_id } = req.params

    try {
        const response = await Group
            .findById(group_id)
            .populate({
                path: "chatHistory",
                populate: {
                    path: "owner",
                    model: "User",
                    select: '-password -email'
                }
            })
        if (!response) {
            return res.status(404).json({ message: 'Spot not found' })
        }
        res.json(response.chatHistory)

    } catch (err) {
        console.error(err)
        next(err)
    }
}

export {
    createChatMsg,
    getAllChatMsgs,
}