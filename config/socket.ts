import { Server as SocketIOServer } from 'socket.io'

const setupSocket = (io: SocketIOServer) => {
    io.on('connection', (socket) => {
        console.log('A user connected')

        socket.on('chat_message', (data) => {
            io.emit('chat_message', data)
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected')
        })

        socket.on('connect_error', (error) => {
            console.log('Socket connection error:', error)
        })
    })
}

export default setupSocket