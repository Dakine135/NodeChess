var chessSprite;
var allPieces;
var currPiece = null;
var socket;


function preload() {
  chessSprite = loadImage('Images/3ZTI1.png');
}

function drawBackground() {
  background(50);
   for(var i = 0;i < 800; i += 200){
       for(var j = 0; j < 800;j += 200){
       rect(i, j, 100, 100);
     }
   }
   for(var i = 100;i < 800; i += 200){
         for(var j = 100; j < 800;j += 200){
         rect(i, j, 100, 100);
       }
     }
}

//runs once at the beggining
function setup(){
  createCanvas(1101,801);
  frameRate(30);
  allPieces = new allPieces();
  // allPieces.newGame();
  socket = io();

  socket.on('pieceMovingUpdate', function(data){
    var movingPiece = allPieces.getById(data.id);
    movingPiece.x = data.x;
    movingPiece.y = data.y;
    // console.log(data);
  });

  socket.on('setCurr', function(data){
    console.log("SetCurr", data);
    currPiece = allPieces.getById(data);
  });

  socket.on('boardState', (boardData) => {
    // console.log("boardStateUpdate: ", boardData);

    boardData.board.forEach((serverPiece)=>{
      allPieces.createOrUpdate(serverPiece.id, serverPiece.x, serverPiece.y,
                               serverPiece.type, serverPiece.count);
    });
    if(boardData.dead != null){
      allPieces.removeById(boardData.dead);
    }
  });

} //end setup

//triggers in frame mouse was pressed
function mousePressed() {
    currPiece = allPieces.getClicked();
    // console.log("Piece that was clicked:", currPiece);
}

//triggers when you let go of mouse
function mouseReleased() {

  if(currPiece != null){
    currPiece = allPieces.snap(currPiece);
    currPiece = null;
    }
}

function keyPressed(){

}

//runs every frame
function draw(){
  drawBackground();

  if (mouseIsPressed === true && currPiece != null) {
    //call to snap piece
    currPiece =  allPieces.mouseMove(currPiece);
    socket.emit("pieceMoving", currPiece);
  }
  // allPieces.update();
  allPieces.update();
  allPieces.draw();

} //draw
