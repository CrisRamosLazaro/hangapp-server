import User from '@/models/UserModel'
import { Request as ExpressRequest, Response, NextFunction } from 'express'
import { handleDuplicateKeyError, MongoError } from '@/helpers/duplicate-key-error-handler'

interface Request extends ExpressRequest {
    payload?: any
}

const signup = async (req: Request, res: Response, next: NextFunction) => {

    const userData = req.body

    try {
        await User.create(userData)
        res.sendStatus(201)

    } catch (err) {
        handleDuplicateKeyError(err as MongoError, req, res, next)
        next(err)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." })
        return
    }

    try {
        const foundUser = await User.findOne({ email })

        if (!foundUser) {
            res.status(401).json({ field: "email", message: "email_not_found" })
            return
        }

        if (foundUser.validatePassword(password)) {
            const authToken = foundUser.signToken()
            res.json({ authToken })
        } else {
            res.status(401).json({ field: "password", message: "wrong_password" })
        }

    } catch (err) {
        res.sendStatus(500)
        next(err)
    }
}

const verify = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(req.payload)
}

export { signup, login, verify }