module.exports = Piece;
function Piece(id, x, y, type, count, shadowCopy) {
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

  this.moveTo = function(x, y){
    //set draw postion
    this.x = x;
    this.y = y;

    //set board Logic Position
    this.posX = x;
    this.posY = y;
  }

}
