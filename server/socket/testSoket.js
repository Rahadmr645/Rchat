
import { Server } from 'socket.io';


const socketConnection = (server) {
    const io = new Server(server, {
        cors: { origin: '*' },
    });


    io.on('connection', (socket) => {
        console.log('user connected', socket.id);

        // when user send video offer
        socket.on('video-offer', (data) => {
            console.log('video offer from:', socket.id);
            socket.broadcast.emit('video offer ', data) // send the video call offers to others
        });


        // when user ansere video call 
        socket.on('video-answer', (data) => {
            console.log('video answer from :', socket.id)
            socket.broadcast.emit('video answer is :', data)
        });


        // when user disconnected
        socket.io('disconnect', () => {
            console.log('User disconnected ', socket.id)
        })
    })

}

export default socketConnection;