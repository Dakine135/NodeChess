let port = 8000;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var AllPieces = require('./allPieces.js');
io.on('connection', function(){ /* … */ });
server.listen(port);


app.use(express.static('./client'));

//setup board on startup
var board = new AllPieces();
board.newGame();
// console.log(board);


io.on('connection', function(socket){
  console.log(socket.id);

  let gameStateInitial = {
    'board': board.boardPieces,
    'dead': null
  }
  socket.emit('boardState', gameStateInitial);

  socket.on('snapEvent', function(data){
      console.log("Snap at", data);
      var movingPiece = board.getById(data.id);

      if(movingPiece != null){
        movingPiece.x = data.x;
        movingPiece.y = data.y;
        var idOfDead = null;
        idOfDead = board.take(movingPiece);
        board.stack(movingPiece);
        console.log(idOfDead);
        let gameState = {
          'board': board.boardPieces,
          'dead': idOfDead
        }
        io.sockets.emit('boardState', gameState);
    }
  });


  socket.on('pieceMoving', function(data){
    // console.log("pieceMoving:", data);
    socket.broadcast.emit('pieceMovingUpdate', data);
  });


  // socket.on('mousePressedListener', function(data){
  //   socket.broadcast.emit('mousePressedEvent', data);
  // });

});
