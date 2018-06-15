var chessSprite;
var allPieces;
var currPiece = null;
var shadowPiece = null;

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
  allPieces = new allPieces();
}

//triggers in frame mouse was pressed
function mousePressed() {
    currPiece = allPieces.getClicked();
    console.log("Piece that was clicked:", currPiece);

    //create shadowCopy that snaps to slots
    shadowPiece = new Piece(currPiece.x, currPiece.y, currPiece.type, 1, true);
}

//triggers when you let go of mouse
function mouseReleased() {

  if(currPiece != null){
    //console.log("mouseReleased Before: ", currPiece);
    //console.log("Mouse: ", mouseX, mouseY);
    let diffX = mouseX % 100;
    let diffY = mouseY % 100;
    //console.log("Diff: ", diffX, diffY);
    currPiece.x = Math.floor(mouseX - diffX);
    currPiece.y = Math.floor(mouseY - diffY);
    allPieces.take(currPiece);
    currPiece = null;
  }

}

function keyPressed(){

}

//runs every frame
function draw(){
  drawBackground();

  if (mouseIsPressed === true && currPiece != null) {
    currPiece.x = Math.floor(mouseX - 32);
    currPiece.y = Math.floor(mouseY - 32);

    //handle and draw shadowPiece
    if(shadowPiece != null){
      let diffX = mouseX % 100;
      let diffY = mouseY % 100;
      shadowPiece.x = Math.floor(mouseX - diffX) + 24;
      shadowPiece.y = Math.floor(mouseY - diffY) + 24;
      shadowPiece.draw();

    }
  }
  allPieces.draw();
} //draw
