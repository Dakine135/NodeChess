function Piece(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;



  //for sprite
  this.spriteSize = 64;
  switch (this.type){
    case "whiteKing":
      this.spriteX = 0;
      this.spriteY = 0;
      break;
    case "blackKing":
      this.spriteX = 0;
      this.spriteY = 65;
      break;
  }

  this.draw = function() {
    copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,this.x,this.y,100,100);
  }
}
