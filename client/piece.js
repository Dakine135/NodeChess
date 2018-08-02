class Piece {

  constructor(id, x, y, type){
    this.id = id;

    //set draw position
    this.x = x;
    this.y = y;
    this.offsetX = 0;

    //board Logic Position
    this.posX = x;
    this.posY = y;

    this.type = type;
    this.size = 100;

    //for moving
    this.pivotX = 50;
    this.pivotY = 25;
    this.moving = false;
    this.pulseScale = 1;
    this.pulseDir = -1;

    //for animation
    this.animation = false;
    this.animateToX = x;
    this.animateToY = y;
    //currently not implimented


    //for sprite
    this.spriteSize = 64;
    switch (this.type){
      case "whiteKing":
        this.spriteX = 0;
        this.spriteY = 0;
        this.graveX = 800;
        this.graveY = 0;
        break;
      case "whiteQueen":
        this.spriteX = 64;
        this.spriteY = 0;
        this.graveX = 900;
        this.graveY = 0;
        break;
      case "whiteRook":
        this.spriteX = 128;
        this.spriteY = 0;
        this.graveX = 1000;
        this.graveY = 0;
        break;
      case "whiteKnight":
        this.spriteX = 192;
        this.spriteY = 0;
        this.graveX = 800;
        this.graveY = 100;
        break;
      case "whiteBishop":
        this.spriteX = 256;
        this.spriteY = 0;
        this.graveX = 900;
        this.graveY = 100;
        break;
      case "whitePawn":
        this.spriteX = 320;
        this.spriteY = 0;
        this.graveX = 1000;
        this.graveY = 100;
        break;
      case "blackKing":
        this.spriteX = 0;
        this.spriteY = 64;
        this.graveX = 800;
        this.graveY = 700;
        break;
      case "blackQueen":
        this.spriteX = 64;
        this.spriteY = 64;
        this.graveX = 900;
        this.graveY = 700;
        break;
      case "blackRook":
        this.spriteX = 128;
        this.spriteY = 64;
        this.graveX = 1000;
        this.graveY = 700;
        break;
      case "blackKnight":
        this.spriteX = 192;
        this.spriteY = 65;
        this.graveX = 800;
        this.graveY = 600;
        break;
      case "blackBishop":
        this.spriteX = 256;
        this.spriteY = 65;
        this.graveX = 900;
        this.graveY = 600;
        break;
      case "blackPawn":
        this.spriteX = 320;
        this.spriteY = 65;
        this.graveX = 1000;
        this.graveY = 600;
        break;

    } //sprite switch
  } //end contructor


  side(){
    return this.id.substring(0,5);
  }

  clicked(){
    if(this.animation) return false;
    if(mouseX > this.posX && mouseX < this.posX + this.size &&
       mouseY > this.posY && mouseY < this.posY + this.size
    ){
         // console.log("Clicked on ",this.type," at ",this.x,",",this.y);
         console.log("Clicked on: ", this);
         return true;
    }
    return false;
  } //end clicked


  moveTo(x, y){
    this.moving = false;
    console.log("moveTo: ",x, y, "From ", this.posX, this.posY);
    if(this.posX == x && this.posY == y){
      //piece was put back down in same spot, aka didnt move
      console.log("Piece Didnt change locations");
      this.x = this.posX;
      this.y = this.posY;
    } else {
      //set draw postion
      this.x = x;
      this.y = y;

      //set board Logic Position
      this.posX = x;
      this.posY = y;

      var data = {
        id: this.id,
        x: this.posX,
        y: this.posY
      };
      socket.emit("movePieceEvent", data);
      allPieces.checkCounts();
    }

  } //end moveTo

  serverUpdate(x, y){
      this.x = x;
      this.y = y;
      this.posX = x;
      this.posY = y;
  }


  //function runs every client frame/tick
  update(){
    this.pulseScale = this.pulseScale + (0.02 * this.pulseDir);
    if(this.pulseScale < 0.4) this.pulseDir = 1;
    if(this.pulseScale > 1) this.pulseDir = -1;
    // console.log(this.pulseScale);

  } // end update


  draw() {
    if(this.moving){
      //calculate grid mouse is in
      let gridX = Math.floor(mouseX - (mouseX % 100));
      let gridY = Math.floor(mouseY - (mouseY % 100));

      //handle and draw shadowPiece
      let shadowSpriteX = gridX + ((1 - this.pulseScale) * (this.size/2));
      let shadowSpriteY = gridY + ((1 - this.pulseScale) * (this.size/2));
      copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,
        shadowSpriteX, shadowSpriteY,
        this.size * this.pulseScale, this.size * this.pulseScale);

      //draw in cell that shadowSprite is in
      push();
      rectMode(CENTER);
      fill(255, 255, 0, 100);
      stroke('yellow');
      strokeWeight(1);
      rect(gridX+50, gridY+50, 100 * this.pulseScale, 100 * this.pulseScale);
      pop();

      //draw last position
      copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,
        this.posX,this.posY,
        this.size,this.size);
      push();
      fill(255, 0, 0, 100);
      stroke('Red');
      strokeWeight(1);
      rect(this.posX, this.posY, 100, 100);
      pop();

      //draw piece in hand/cursor
      let sizeScale = 3/4;
      let xShift = -this.pivotX * sizeScale;
      let yShift = -this.pivotY * sizeScale;
      copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,
        this.x + xShift, this.y + yShift,
        this.size*sizeScale,this.size*sizeScale);
    }
    else{
      //draw normal non-moving peice on board
      copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,
        this.x + this.offsetX,this.y,
        this.size,this.size);
    }

  } // end draw
} // end Piece Class
