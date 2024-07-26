import express, { Router } from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import spotRoutes from './spot.routes'
import commentRoutes from './comment.routes'

const router: Router = express.Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/spots", spotRoutes)
router.use("/spots", commentRoutes)

export default router