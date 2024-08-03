import { Request, Response, NextFunction } from 'express'
import Group from '@/models/GroupModel'

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
    deleteGroup
}