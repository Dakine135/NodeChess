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
        board.take(movingPiece);
        idOfDead = board.stack(movingPiece);
        console.log("ID of Dead",idOfDead);
        let gameState = {
          'board': board.boardPieces,
          'dead': idOfDead
        }
        io.sockets.emit('boardState', gameState);
    }
  });


  socket.on('unStackEvent', function(data){
    console.log("Unstack Event");
    var unStackPiece = board.getById(data.id);
    if(unStackPiece != null){
      console.log("Unstacked piece" , data.newId);
      unStackPiece.count--;
      board.setNewPiece(data.newId , unStackPiece);


      // board.boardPieces.push(new Piece(data.newId, unStackPiece.x, unStackPiece.y, unStackPiece.type, 1));
  }
    let gameState = {
      'board': board.boardPieces,
      'dead': null
    }
    io.sockets.emit('boardState', gameState);

    socket.emit('setCurr',data.newId);

  });


  socket.on('pieceMoving', function(data){
    // console.log("pieceMoving:", data);
    socket.broadcast.emit('pieceMovingUpdate', data);
  });


  // socket.on('mousePressedListener', function(data){
  //   socket.broadcast.emit('mousePressedEvent', data);
  // });

});
