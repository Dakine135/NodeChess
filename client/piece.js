class Piece {

  constructor(id, x, y, type, count, shadowCopy){
    this.id = id;

    //set draw position
    this.x = x;
    this.y = y;

    //board Logic Position
    this.posX = x;
    this.posY = y;

    this.type = type;
    this.size = 100;
    this.count = count;
    this.shadowCopy = shadowCopy | false;

    //for moving
    this.pivotX = 50;
    this.pivotY = 25;
    this.moving = false;

    this.pixelsToShift = 8;

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
    if(mouseX > this.x && mouseX < this.x + this.size &&
       mouseY > this.y && mouseY < this.y + this.size
    ){
         console.log("Clicked on ",this.type," at ",this.x,",",this.y);
         return true;
    }
    return false;
  } //end clicked


  moveTo(x, y){
    this.moving = false;
    if(this.posX === x && this.poxY === y){
      //piece was put back down in same spot, aka didnt move
    } else {
      //set draw postion
      this.x = x;
      this.y = y;

      //set board Logic Position
      this.posX = x;
      this.posY = y;
    }
  } //end moveTo


  update(){

  } // end update


  draw() {
    if(this.moving){

      //handle and draw shadowPiece
      let gridX = Math.floor(mouseX - (mouseX % 100));
      let gridY = Math.floor(mouseY - (mouseY % 100));
      let shadowSprite = {};
      shadowSprite.x = gridX + 24;
      shadowSprite.y = gridY + 24;
      copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,shadowSprite.x,shadowSprite.y,this.size/2,this.size/2);

      //draw box in cell that shadowSprite is in
      push();
      fill(0,0,0,0);
      stroke('yellow');
      strokeWeight(5);
      rect(gridX, gridY, 100, 100);
      pop();

      //draw box from last position
      push();
      fill(0,0,0,0);
      stroke('green');
      strokeWeight(4);
      rect(this.posX, this.posY, 100, 100);
      pop();

    }
    var minSpread = 0 - Math.floor(this.count/2);
    var maxSpread = 0 + Math.ceil(this.count/2);
    // console.log(minSpread, " => ", maxSpread, "   Count: ", this.count);
    for(var i = minSpread; i<maxSpread; i++){
      copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,this.x+(this.pixelsToShift*i),this.y,this.size,this.size);
    }
  } // end draw
} // end Piece Class
