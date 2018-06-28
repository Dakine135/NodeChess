var chessSprite;
var allPieces;
var currPiece = null;
var shadowPiece = null;
var lastPositionBox = null;
var socket;

// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;

var engine;

// var boxA;
// var boxB;
// var ground;


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
  allPieces.newGame();
  socket = io();

  socket.on('snap',(data)=>{
        var movingPiece = allPieces.getById(data.id);
        movingPiece.x = data.x;
        movingPiece.y = data.y;
        console.log("snap at", data);
  });

    // create an engine
    engine = Engine.create();

    // create two boxes and a ground
    // boxA = Bodies.rectangle(400, 200, 80, 80);
    // boxB = Bodies.rectangle(450, 50, 80, 80);
    // ground = Bodies.rectangle(400, 610, 810, 60, {
    //   isStatic: true
    // });

      // add all of the bodies to the world
     // World.add(engine.world, [boxA, boxB, ground]);

     // run the engine
     Engine.run(engine);

} //end setup

//triggers in frame mouse was pressed
function mousePressed() {
    currPiece = allPieces.getClicked();
    if(currPiece && currPiece.count > 1){
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
      // console.log("shadowPiece create: ", shadowPiece);
      lastPositionBox = {x:currPiece.x, y:currPiece.y};
      // currPiece.swinging = true;
      // currPiece.addSwing(HALF_PI);
    }
}

//triggers when you let go of mouse
function mouseReleased() {

  if(currPiece != null){
    // currPiece.swinging = false;
    // currPiece.angle = 0;
    currPiece = allPieces.snap(currPiece);


    allPieces.take(currPiece);
    allPieces.stack(currPiece);

    var data = {
      id: currPiece.id,
      x: currPiece.x,
      y: currPiece.y
    };
    socket.emit("snapEvent", data);
    // socket.on('take', (data)=>{
    //   var movingPiece = allPieces.getById(data.id);
    //   allPieces.take(movingPiece);
    //   console.log("take receive:", data);
    // });
    // socket.emit('takeListener', currPiece);
    currPiece = null;
    shadowPiece = null;
    lastPositionBox = null;
    }
}

function keyPressed(){

}
//runs every frame
function draw(){
  drawBackground();
  socket.on('pieceMovingUpdate', function(data){
    var movingPiece = allPieces.getById(data.id);
    movingPiece.x = data.x;
    movingPiece.y = data.y;
    // console.log(data);
  });

  if (mouseIsPressed === true && currPiece != null) {
    //call to snap piece
    currPiece =  allPieces.mouseMove(currPiece);
    socket.emit("pieceMoving", currPiece);

    //handle and draw shadowPiece
    if(shadowPiece != null){
      let gridX = Math.floor(mouseX - (mouseX % 100));
      let gridY = Math.floor(mouseY - (mouseY % 100));
      shadowPiece.x = gridX + 24;
      shadowPiece.y = gridY + 24;
      // console.log("shadowPiece draw: ", shadowPiece);
      shadowPiece.draw();
      push();
      fill(0,0,0,0);
      stroke('yellow');
      strokeWeight(5);
      rect(gridX, gridY, 100, 100);
      pop();
      push();
      fill(0,0,0,0);
      stroke('green');
      strokeWeight(4);
      rect(lastPositionBox.x, lastPositionBox.y, 100, 100);
      pop();
    }
  }
  // allPieces.update();
  allPieces.update();
  allPieces.draw();


  // Ground vertices
  // var vertices = ground.vertices;
  // beginShape();
  // fill(127);
  // for (var i = 0; i < vertices.length; i++) {
  //   vertex(vertices[i].x, vertices[i].y);
  // }
  // endShape();


} //draw
