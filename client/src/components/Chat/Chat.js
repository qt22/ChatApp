import React, { useState, useEffect} from 'react';
import queryString from 'query-string'; // help retrieving data from url
import io from 'socket.io-client';

import './Chat.css';



// import components
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';



let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'https://jerry-chatapp.herokuapp.com/';

    // use effect only changes if the object in the array of its parameter changes 
    useEffect(() => {
        const { name, room } = queryString.parse(location.search); // retrieve the data that users entered
        // location.search gives second part of url (the parameters)

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room); 

        socket.emit('join', { name, room }, () => {
            
        }); // send the name and the room to back end

        return () => {
            socket.emit('disconnect');

            socket.off(); // turn off this one instance of socket
        } // disconnection of socket, also connects to back end 
           
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]); 
            // send one message to the messages array, ...messages means add one message at the end of all other messages
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault(); // prevent default refreshes 

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
            // () => setMessage('') sets the message to an empty string after the user sends the message
        }
    }

    console.log(message, messages);

    // function for sending messages

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;