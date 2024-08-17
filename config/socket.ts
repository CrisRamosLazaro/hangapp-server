import { Server as SocketIOServer } from 'socket.io'
import User from '@/models/UserModel'

const setupSocket = (io: SocketIOServer) => {

    io.on('connection', socket => {
        console.log(socket.id, " has joined the server!")

        socket.on("join_room", (room) => {
            socket.join(room)
        })

        // socket.on('chat_message', (data) => {

        //     // Emits the message to everyone in the room except the sender
        //     // socket.to(data.room).emit("receive_message", data)

        //     // Sends the message to everyone in the room, including the sender
        //     io.in(data.room).emit('receive_message', data)
        // })

        socket.on('chat_message', async (data) => {
            try {
                const user = await User.findById(data.userId).select('-email -password')
                const date = new Date()

                const message = {
                    content: data.message,
                    owner: user,
                    createdAt: date
                }

                io.in(data.room).emit('receive_message', message)

            } catch (err) {
                console.error('Error handling chat message:', err)
            }
        })

        socket.on('disconnect', () => {
            console.log(socket.id, 'has disconnected')
        })

        socket.on('connection_error', (error) => {
            console.log('Socket connection error:', error)
        })

        socket.emit('message', "data string whatever")
    })
}

export default setupSocket