const app = require('express')();
const express = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  path: '/socket.io/',
  serveClient: true,
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});

const port = 3000;

var users = {}

app.use('/app', express.static('public'));

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on("key",function(data){
    console.log(data);
    

    fetch("https://bsd.instructure.com/api/v1/users/self/favorites/courses?access_token="+data+"&per_page=99999").then((req) => {
    try{
      req.json().then((json) => {
        const classes = {}
        console.log(json)
        for( key in json ){
          console.log(json[key].name)
          classes[json[key].id] = {
            "name":json[key].name,
            "id":json[key].id,
          }
          socket.join(json[key].id)
        }
        socket.emit("classes",classes)
        
      })
    } catch (err){
      console.log(err)
    }
    })
  })
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});