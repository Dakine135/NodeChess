let port = 8000;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(){ /* … */ });
server.listen(port);


app.use(express.static('./client'));


// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });


// app.listen(port, () => {
//   console.log('Node Chess listening on port ', port);
// });


io.on('connection', function(socket){
  console.log(socket.id);

socket.on('snapEvent', function(data){
      console.log("currPiece at", data);
      socket.broadcast.emit('snap', data);
});


  socket.on('pieceMoving', function(data){
    // console.log("testEvent:", data);
    socket.broadcast.emit('pieceMovingUpdate', data);

  });









});
