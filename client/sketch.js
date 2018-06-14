var chessSprite;
var allPieces;

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
  createCanvas(801,801);

    //setup all the pieces
     allPieces = [
       new Piece(0,0,"whiteRook"),
       new Piece(100,0,"whiteKnight"),
       new Piece(200,0,"whiteBishop"),
       new Piece(300,0,"whiteKing"),
       new Piece(400,0,"whiteQueen"),
       new Piece(500,0,"whiteBishop"),
       new Piece(600,0,"whiteKnight"),
       new Piece(700,0,"whiteRook"),

       new Piece(0,700,"blackRook"),
       new Piece(100,700,"blackKnight"),
       new Piece(200,700,"blackBishop"),
       new Piece(300,700,"blackKing"),
       new Piece(400,700,"blackQueen"),
       new Piece(500,700,"blackBishop"),
       new Piece(600,700,"blackKnight"),
       new Piece(700,700,"blackRook"),
     ];

     //add Pawns
     for (var i=0; i<8; i++){
       allPieces.push(
         new Piece(100*i,100,"whitePawn")
       );
       allPieces.push(
         new Piece(100*i,600,"blackPawn")
       );
     }





}

//triggers in frame mouse was pressed
function mousePressed() {

  allPieces.forEach((piece)=>{
    if(piece.clicked()){
      console.log("Piece that was clicked:", piece);
    }
  });
}

//triggers when you let go of mouse
function mouseReleased() {

}

function keyPressed(){

}

//runs every frame
function draw(){
  drawBackground();

  if (mouseIsPressed === true) {
    //see exmaple
    //https://p5js.org/examples/drawing-continous-lines.html
    //and reference Event -> Mouse section
  }

  // image(chessSprite, 200, 300);
  allPieces.forEach((piece)=>{
    piece.draw();
  });

} //draw
