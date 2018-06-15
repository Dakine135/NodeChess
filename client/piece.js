function Piece(id, x, y, type, count, shadowCopy) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.type = type;
  this.size = 100;
  this.count = count;
  this.shadowCopy = shadowCopy | false;

  var pixelsToShift = 6;

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

  } //sprite switch

  this.side = function(){
    return this.id.substring(0,5);
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
    if(this.shadowCopy){
      tint(255, 50);
      copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,this.x,this.y,this.size/2,this.size/2);
    } else{
      var minSpread = 0 - Math.floor(this.count/2);
      var maxSpread = 0 + Math.ceil(this.count/2);
      // console.log(minSpread, " => ", maxSpread, "   Count: ", this.count);
      for(var i = minSpread; i<maxSpread; i++){
        copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,this.x+(pixelsToShift*i),this.y,this.size,this.size);
      }
    }

  }
}
