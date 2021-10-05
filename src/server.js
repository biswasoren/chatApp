import express from 'express';
import bodyParser from 'body-parser';
import { initDb } from '../db/database.connection.js';

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

const connections = [];
const users = [];
// Start Db
initDb();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.sockets = io;

  next();
});

const path = require('path');

const port = process.env.PORT || 4000;

// Static file declaration
app.use(express.static(path.join(__dirname, '../build')));

require('./api').default(app);

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'Welcome !' });
});

// production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  //
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}
// build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port);
console.log('app running on port ', port);

// Socket

io.sockets.on('connection', (socket) => {
  connections.push(socket);

  socket.on('add_user', (data) => {
    users.push(data);
    socket.user = data;
    app.use((req, res, next) => {
      req.user = data;

      next();
    });
    io.sockets.emit('all_users', users);
  });

  socket.on('which_user', (data) => {
    io.sockets.emit('this_user', socket.user);
  });

  socket.on('disconnect', (data) => {
    const index = connections.indexOf(socket);
    const userIndex = users.indexOf(socket.user);

    connections.splice(index, 1);
    users.splice(userIndex, 1);
    io.sockets.emit('all_users', users);
  });
});
