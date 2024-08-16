import express, { Router } from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import spotRoutes from './spot.routes'
import commentRoutes from './comment.routes'
import groupRoutes from './group.routes'
import chatRoutes from './chat.routes'

const router: Router = express.Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/spots", spotRoutes)
router.use("/spots", commentRoutes)
router.use("/groups", groupRoutes)
router.use("/chat", chatRoutes)

export default router