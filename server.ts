import 'dotenv/config'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import app from './app'
import setupSocket from '@/config/socket'

const PORT = process.env.PORT || 5005

const server = http.createServer(app)

const io = new SocketIOServer(server, {

    cors: {
        origin: process.env.ORIGIN || 'http://localhost:5173', // Change to deployed url when deployed
    },
})

setupSocket(io)

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})