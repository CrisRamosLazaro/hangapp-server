import { Request, Response, NextFunction } from 'express'
import User from '../models/UserModel'

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User
        .find()
        .select({ firstName: 1, lastName: 1, avatar: 1, _id: 1 })
        .sort({ name: 1 })
        .then(foundUsers => res.json(foundUsers))
        .catch(err => next(err))
}

const getOneUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    User
        .findById(id)
        .then(foundUser => res.json(foundUser))
        .catch(err => next(err))
}

const editUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { firstName, lastName, email, avatar } = req.body

    User
        .findByIdAndUpdate(id, { firstName, lastName, email, avatar }, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => next(err))
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}

export {
    getAllUsers,
    getOneUser,
    editUser,
    deleteUser,
}