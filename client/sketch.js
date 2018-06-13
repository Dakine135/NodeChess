var chessSprite;
 var whiteKing

function preload() {
  chessSprite = loadImage('Images/3ZTI1.png');
}

//runs once at the beggining
function setup(){
  createCanvas(801,801);
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

     whiteKing = new Piece(0,0,"whiteKing");

}

function mousePressed() {

}

function keyPressed(){

}

function draw(){

  image(chessSprite, 100, 100);
  whiteKing.draw();


} //draw
