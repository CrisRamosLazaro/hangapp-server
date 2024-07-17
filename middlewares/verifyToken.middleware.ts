import { expressjwt } from "express-jwt"
import { Request } from "express"

const isAuthenticated = expressjwt({
    secret: process.env.TOKEN_SECRET as string,
    algorithms: ["HS256"],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders
})

function getTokenFromHeaders(req: Request) {

    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const token = req.headers.authorization.split(" ")[1]

        return token
    }
    return undefined
}

export { isAuthenticated }