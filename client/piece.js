function Piece(x, y, type, count) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.size = 100;
  this.count = count;



  //for sprite
  this.spriteSize = 64;
  switch (this.type){
    case "whiteKing":
      this.spriteX = 0;
      this.spriteY = 0;
      break;
    case "whiteQueen":
      this.spriteX = 64;
      this.spriteY = 0;
      break;
    case "whiteRook":
      this.spriteX = 128;
      this.spriteY = 0;
      break;
    case "whiteKnight":
      this.spriteX = 192;
      this.spriteY = 0;
      break;
    case "whiteBishop":
      this.spriteX = 256;
      this.spriteY = 0;
      break;
    case "whitePawn":
      this.spriteX = 320;
      this.spriteY = 0;
      break;
    case "blackKing":
      this.spriteX = 0;
      this.spriteY = 64;
      break;
    case "blackQueen":
      this.spriteX = 64;
      this.spriteY = 64;
      break;
    case "blackRook":
      this.spriteX = 128;
      this.spriteY = 64;
      break;
    case "blackKnight":
      this.spriteX = 192;
      this.spriteY = 65;
      break;
    case "blackBishop":
      this.spriteX = 256;
      this.spriteY = 65;
      break;
    case "blackPawn":
      this.spriteX = 320;
      this.spriteY = 65;
      break;

  }

  this.clicked = function(){
    if(mouseX > this.x && mouseX < this.x + this.size &&
       mouseY > this.y && mouseY < this.y + this.size
    ){
         console.log("Clicked on ",this.type," at ",this.x,",",this.y);
         return true;
    }
    return false;
  }

  this.draw = function() {
    copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,this.x,this.y,this.size,this.size);
  }
}
