module.exports = Piece;
function Piece(id, x, y, type, count, shadowCopy) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.type = type;
  this.size = 100;
  this.count = count;

  var pixelsToShift = 8;

  //for sprite
  this.spriteSize = 64;
  switch (this.type){
    case "whiteKing":
      this.graveX = 800;
      this.graveY = 0;
      break;
    case "whiteQueen":
      this.graveX = 900;
      this.graveY = 0;
      break;
    case "whiteRook":
      this.graveX = 1000;
      this.graveY = 0;
      break;
    case "whiteKnight":
      this.graveX = 800;
      this.graveY = 100;
      break;
    case "whiteBishop":
      this.graveX = 900;
      this.graveY = 100;
      break;
    case "whitePawn":
      this.graveX = 1000;
      this.graveY = 100;
      break;
    case "blackKing":
      this.graveX = 800;
      this.graveY = 700;
      break;
    case "blackQueen":
      this.graveX = 900;
      this.graveY = 700;
      break;
    case "blackRook":
      this.graveX = 1000;
      this.graveY = 700;
      break;
    case "blackKnight":
      this.graveX = 800;
      this.graveY = 600;
      break;
    case "blackBishop":
      this.graveX = 900;
      this.graveY = 600;
      break;
    case "blackPawn":
      this.graveX = 1000;
      this.graveY = 600;
      break;
  } //sprite switch

  this.side = function(){
    return this.id.substring(0,5);
  }

  // this.clicked = function(){
  //   if(mouseX > this.x && mouseX < this.x + this.size &&
  //      mouseY > this.y && mouseY < this.y + this.size
  //   ){
  //        console.log("Clicked on ",this.type," at ",this.x,",",this.y);
  //        return true;
  //   }
  //   return false;
  // }

  // this.draw = function() {
  //   if(this.shadowCopy){
  //     tint(255, 50);
  //     copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,this.x,this.y,this.size/2,this.size/2);
  //   } else{
  //     var minSpread = 0 - Math.floor(this.count/2);
  //     var maxSpread = 0 + Math.ceil(this.count/2);
  //     // console.log(minSpread, " => ", maxSpread, "   Count: ", this.count);
  //     for(var i = minSpread; i<maxSpread; i++){
  //       copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,this.x+(pixelsToShift*i),this.y,this.size,this.size);
  //     }
  //   }
  //
  //
  // }
}
