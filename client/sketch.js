var chessSprite;
var allPieces;
var currPiece = null;

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
}

//triggers when you let go of mouse
function mouseReleased() {

  if(currPiece != null){
    console.log("mouseReleased Before: ", currPiece);
    console.log("Mouse: ", mouseX, mouseY);
    let diffX = mouseX % 100;
    let diffY = mouseY % 100;
    console.log("Diff: ", diffX, diffY);
    currPiece.x = Math.floor(mouseX - diffX);
    currPiece.y = Math.floor(mouseY - diffY);
    allPieces.take(currPiece);

    console.log("mouseReleased: ", currPiece);




    currPiece = null;
  }

}

function keyPressed(){

}

//runs every frame
function draw(){
  drawBackground();

  if (mouseIsPressed === true && currPiece != null) {
    //see exmaple
    //https://p5js.org/examples/drawing-continous-lines.html
    currPiece.x = Math.floor(mouseX - 32);
    currPiece.y = Math.floor(mouseY - 32);
    //and reference Event -> Mouse section
  }
  allPieces.draw();
} //draw
