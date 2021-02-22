import socketIOClient from "socket.io-client";

// const socket = socketIOClient('http://localhost:4000');
const socket = socketIOClient('https://tone-analysing-chat.herokuapp.com');


export {
    socket
}