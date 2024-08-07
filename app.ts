import './db/index'
import express, { Express } from 'express'

const app: Express = express()

import config from './config/index'
config(app)

import routes from './routes/index'
app.use('/api', routes)

import { jwtErrorHandler } from './middlewares/verifyToken.middleware'
app.use(jwtErrorHandler)

import errorHandler from './errors/index'
errorHandler(app)

export default app