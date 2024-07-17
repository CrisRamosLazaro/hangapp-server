import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '@/models/UserModel'
import { Request as ExpressRequest, Response, NextFunction } from 'express'

interface Request extends ExpressRequest {
    payload?: any
}

const signup = (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, avatar } = req.body

    User.create({ firstName, lastName, email, password, avatar })
        .then(() => res.sendStatus(201))
        .catch(err => res.sendStatus(500))
}

const login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ["Provide email and password."] })
        return
    }

    User.findOne({ email })
        .then((foundUser) => {
            if (!foundUser) {
                res.status(401).json({ errorMessages: ["User not found."] })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {
                const { _id, firstName, lastName, email, role } = foundUser
                const payload = { _id, firstName, lastName, email, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET as string,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.json({ authToken: authToken })
            } else {
                res.status(401).json({ errorMessages: ["Unable to authenticate the user"] })
            }
        })
        .catch(err => res.sendStatus(500))
}

const verify = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(req.payload)
}

export { signup, login, verify }