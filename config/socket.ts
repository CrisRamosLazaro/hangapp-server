import { Server as SocketIOServer } from 'socket.io'

const setupSocket = (io: SocketIOServer) => {

    io.on('connection', socket => {
        console.log(socket.id, " has joined the server!")

        socket.on("join_room", (room) => {
            socket.join(room)
        })

        socket.on('chat_message', (data) => {
            console.log("console.logged chat message", data)

            socket.to(data.room).emit("receive_message", data)

            //This one is to all the app👇
            // socket.broadcast.emit("receive_message", data)

            // io.emit('chat_message', data)
            // io.emit('chat_message', `${socket.id.substring(0,2)} said ${data}`)
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