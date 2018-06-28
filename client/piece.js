function Piece(id, x, y, type, count, shadowCopy) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.type = type;
  this.size = 100;
  this.count = count;
  this.shadowCopy = shadowCopy | false;

  //for swigining
  this.swinging = false;
  this.pivotX = 50;
  this.pivotY = 25;
  this.angle = 0;
  this.heading = HALF_PI;
  this.energy = 0;
  this.speed = 0;


  var pixelsToShift = 8;

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

  this.addSwing = function(heading, mag){
    // console.log(heading, mag);
    this.heading = heading;
    this.energy = this.energy + abs(mag);
    this.speed = 0.1;
    if(this.energy > 100) this.energy = 100;
    console.log(this.energy);
  }

  this.update = function(){
    let diff = this.heading - this.angle;
    let force = map(this.energy, 0, 100, 0, 1);
    this.angle = this.angle + (diff*force);

    if(this.angle > 0.1){
      // let top = map(force,0,1,0,HALF_PI);
      this.angle = this.angle + this.speed;
    }
    else if(this.angle < -0.1){
      this.angle = this.angle + this.speed;
    }
    else {
      this.angle = 0;
    }
  }

  this.draw = function() {
    if(this.shadowCopy){
      tint(255, 50);
      copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,this.x,this.y,this.size/2,this.size/2);
    } else{

      if(this.swinging){
        push();
        translate(this.x + this.pivotX, this.y + this.pivotY);
        rotate(this.angle);
        copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,-(this.pivotX),-(this.pivotY),this.size,this.size);
        pop();
        // this.angle = this.angle + this.swingDirection;
        // if(this.angle > (PI/4) || this.angle < (-PI/4)) this.swingDirection = this.swingDirection * -1;
      } else {
        var minSpread = 0 - Math.floor(this.count/2);
        var maxSpread = 0 + Math.ceil(this.count/2);
        // console.log(minSpread, " => ", maxSpread, "   Count: ", this.count);
        for(var i = minSpread; i<maxSpread; i++){
          copy(chessSprite,this.spriteX,this.spriteY,this.spriteSize,this.spriteSize,this.x+(pixelsToShift*i),this.y,this.size,this.size);
        }
      } //swinging

    }

  } // end draw
} // end Piece Class
