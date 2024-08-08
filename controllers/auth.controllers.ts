import User from '@/models/UserModel'
import { Response, NextFunction } from 'express'
import { handleDuplicateKeyError, MongoError } from '@/helpers/duplicate-key-error-handler'
import { Request } from '@/types/express-custom'

const signup = async (req: Request, res: Response, next: NextFunction) => {

    const userData = req.body

    try {
        await User.create(userData)
        res.sendStatus(201)

    } catch (err) {
        handleDuplicateKeyError(err as MongoError, req, res, next)
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "provide_email_and_password" })
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
    }
}

const verify = (req: Request, res: Response, next: NextFunction) => {

    if (req.authError && req.authError.name === 'Unauthorized') {
        return res.status(401).json({ message: 'JWT expired' })
    }

    res.status(200).json(req.payload)
}

export { signup, login, verify }