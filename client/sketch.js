function preload() {
  chessSprite = loadImage('Images/3ZTI1.png');
}

//runs once at the beggining
function setup(){
  createCanvas(801,801);




}

function mousePressed() {

}

function keyPressed(){

}

function draw(){
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
  image(chessSprite, 100, 100);
  copy(chessSprite,0,0,64,64,300,0,100,100);


} //draw
