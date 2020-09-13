import React, { useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search); // retrieve the data that users entered

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room); 

        socket.emit('join', { name, room }, () => {
            
        }); // send data to back end

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
            // disconnection
    }, [ENDPOINT, location.search]);
    return (
        <h1>Chat</h1>
    )
}

export default Chat;