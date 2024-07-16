import './db/index'
import express, { Express } from 'express'

const app: Express = express()

import config from './config/index'
config(app)

import routes from './routes/index'
app.use('/api', routes)

import errorHandler from './errors/index'
errorHandler(app)

export default app