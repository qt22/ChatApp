const express = require(`express`);
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUserInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000; // process.env is a file, it requests the address from there

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server); 
// these three lines are a rundown to make the server working

// add db here


app.use(router);
app.use(cors());

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => { // this function receives the message from front end
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error); // handle errors;

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` }); // send to front end

        socket.join(user.room);

        //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();

    });   
    
    socket.on('sendMessage', (message, callback) => { // the message is from front end
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message } ); 
        //io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
        }
    })
}); // User connection and disconnection event

app.use(router); // this thing fetches the stuff in router.js and displays it on the website

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));