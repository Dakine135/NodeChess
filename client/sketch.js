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
  allPieces.newGame();
}

//triggers in frame mouse was pressed
function mousePressed() {
    currPiece = allPieces.getClicked();
    if(currPiece.count > 1){
      //create new piece with unique id at cursor
      var newId = currPiece.id;
      while(allPieces.getById(newId) != null){
        newId = newId + "#";
      }
      currPiece.count--;
      currPiece = new Piece(newId, currPiece.x, currPiece.y, currPiece.type, 1);
      allPieces.boardPieces.push(currPiece);
    } // end create new Piece at cursor
    console.log("Piece that was clicked:", currPiece);

    //create shadowCopy that snaps to slots
    if(currPiece != null){
      shadowPiece = new Piece("Shadow "+currPiece.id, currPiece.x, currPiece.y, currPiece.type, 1, true);
    }
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
    allPieces.stack(currPiece);
    currPiece = null;
    shadowPiece = null;
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
      let gridX = Math.floor(mouseX - mouseX % 100);
      let gridY = Math.floor(mouseY - mouseY % 100);
      shadowPiece.x = gridX + 24;
      shadowPiece.y = gridY + 24;
      shadowPiece.draw();
      push();
      fill(0,0,0,0);
      stroke(255, 204, 0);
      strokeWeight(4);
      rect(gridX, gridY, 100, 100);
      pop();

    }
  }
  allPieces.draw();
} //draw
