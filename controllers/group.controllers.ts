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

export {
    createGroup
}