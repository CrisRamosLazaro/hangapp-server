import express, { Router } from 'express'

const router: Router = express.Router()

router.use("/auth", require('./auth.routes'))

export default router