const app = require('express')();
const express = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);


const port = 3000;

app.use('/app',express.static('public'))

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})