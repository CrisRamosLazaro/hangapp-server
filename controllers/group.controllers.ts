import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import Group from '@/models/GroupModel'
import User from '@/models/UserModel'

const createGroup = async (req: Request, res: Response, next: NextFunction) => {

    const { name, description, owner, members } = req.body

    try {
        const newGroup = await Group.create({ name, description, owner, members })
        res.status(201).json(newGroup)
    } catch (err) {
        console.error(err)
    }
}

const getAllGroups = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const groups = await Group
            .find()
            .sort({ createdAt: -1 })
            .populate([
                {
                    path: 'members',
                    select: '-password -email'
                },
                {
                    path: 'owner',
                    select: '-password -email'
                }
            ])

        if (!groups) {
            return res.status(404).json({ message: "No groups found" })
        }
        res.status(201).json(groups)

    } catch (err) {
        console.error(err)
        next(err)
    }
}

const getOneGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { group_id } = req.params

    try {
        const response = await Group
            .findById(group_id)
            .populate({
                path: 'members',
                select: '-password -email'
            })
        if (!response) {
            return res.status(404).json({ message: 'Spot not found' })
        }
        res.status(201).json(response)

    } catch (err) {
        console.error(err)
    }
}

const joinGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { group_id } = req.params
    const { user_id } = req.body

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const updatedGroup = await Group.findByIdAndUpdate(group_id, { $addToSet: { members: user_id } }, { new: true })
        await User.findByIdAndUpdate(user_id, { $addToSet: { groups: group_id } }, { new: true })

        await session.commitTransaction()
        session.endSession()

        res.status(200).json({ message: 'success_you_joined_the_group', updatedGroup })

    } catch (err) {
        await session.abortTransaction()
        session.endSession()

        console.error(err)
        res.status(500).json({ message: 'error_joining_the_group' })
    }
}

const leaveGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { group_id } = req.params
    const { user_id } = req.body

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const updatedGroup = await Group.findByIdAndUpdate(group_id, { $pull: { members: user_id } }, { new: true })
        await User.findByIdAndUpdate(user_id, { $pull: { groups: group_id } }, { new: true })

        await session.commitTransaction()
        session.endSession()

        res.status(200).json({ message: 'success_you_left_the_group', updatedGroup })

    } catch (err) {
        await session.abortTransaction()
        session.endSession()

        console.error(err)
        res.status(500).json({ message: 'error_leaving_the_group' })
    }



}

const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {

    const { group_id } = req.params

    try {
        await Group.findByIdAndDelete(group_id)
        res.status(200).json({ message: "Group deleted successfully" })
    } catch (err) {
        console.error(err)
        next(err)
    }

}

export {
    createGroup,
    getAllGroups,
    getOneGroup,
    joinGroup,
    leaveGroup,
    deleteGroup
}