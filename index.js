let port = 8000;
var express = require('express');
var app = express();
var reload = require('reload');
reload(app);
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
  console.log("connection", socket.id);

  let gameStateInitial = {
    'board': board.boardPieces
  }
  socket.emit('boardState', gameStateInitial);

  socket.on('movePieceEvent', function(data){
      console.log("movePieceEvent at", data);
      var movingPiece = board.getById(data.id);

      if(movingPiece != null){
        movingPiece.x = data.x;
        movingPiece.y = data.y;
        // var idOfDead = null;
        board.take(movingPiece);
        // idOfDead = board.stack(movingPiece);
        // console.log("ID of Dead",idOfDead);
        let gameState = {
          'board': board.boardPieces
        }
        io.sockets.emit('boardState', gameState);
    }
  });


  socket.on('pieceMoving', function(data){
    // console.log("pieceMoving:", data);
    socket.broadcast.emit('pieceMovingUpdate', data);
  });

  socket.on('resetBoard', function(){
    console.log("resetBoard called");
    board.newGame();
    let gameState = {
      'board': board.boardPieces
    }
    io.sockets.emit('boardState', gameState);
  });


  // socket.on('mousePressedListener', function(data){
  //   socket.broadcast.emit('mousePressedEvent', data);
  // });

});
