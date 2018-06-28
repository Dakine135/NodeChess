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
  this.swingDirection = "still";
  this.startSwing = 0;
  this.potentialEnergy = 0;
  this.kineticEnergy = 0;
  this.lastKineticEnergy = 0;
  this.maxEnergy = 0.4;
  this.maxkineticEnergy = 0.4
  this.minimumEnergy = 0.1;
  this.energyLoss = 0.5;


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

      this.angle = heading;
      if(this.angle > PI){
        //convert to negative rotation if past vertical clockwise
        //basicaly always want to keep rotation between -PI and PI
        this.anlge = this.angle - (2*PI);
      }
      // let diffFromRest = abs(this.angle);
      this.swingDirection = "down";
      // this.potentialEnergy = Math.round(map(diffFromRest, 0, PI, 0, 1)*100)/100;
      this.potentialEnergy = abs(this.angle);
      this.maxkineticEnergy = map(this.potentialEnergy,0,PI,this.minimumEnergy, this.maxEnergy);
      this.kineticEnergy = 0;
      console.log("-----------------");
      console.log("Energy:", this.potentialEnergy, this.kineticEnergy);
      console.log("Angle:", this.angle, "Dir:", this.swingDirection);
      //TODO set kineticEnergy energy based on swing added (mag)
  
  } //end addSwig

  this.update = function(){
    //update potentialEnergy and kineticEnergy
    // console.log("update: ###################");
    // console.log("Energy:", Math.round(this.potentialEnergy *100)/100, Math.round(this.kineticEnergy *100)/100);
    // // console.log("Total: ", this.potentialEnergy + this.kineticEnergy);
    // console.log("Angle:", Math.round(this.angle *100)/100, "Dir:", this.swingDirection);
    if(this.swingDirection != "still"){

      if(this.potentialEnergy === 0){
        console.log("SET TO STILL");
        this.swingDirection = "still";
        this.angle = 0;
      }

      let diffFromTop = abs(this.potentialEnergy - abs(this.angle));
      // console.log("diffFromTop:",diffFromTop);
      this.lastKineticEnergy = this.kineticEnergy;
      this.kineticEnergy = map(diffFromTop, 0, this.potentialEnergy, this.minimumEnergy, this.maxkineticEnergy);


      //move angle based on kineticEnergy
      if(this.swingDirection === "down"){
        let prevAngle = this.angle;
        if(this.angle > 0) this.angle = this.angle - this.kineticEnergy;
        else this.angle = this.angle + this.kineticEnergy;
        if(Math.sign(prevAngle) != Math.sign(this.angle)) this.swingDirection = "up";
      }
      if(this.swingDirection === "up"){
        let prevAngle = this.angle;
        if(this.angle > 0) this.angle = this.angle + this.kineticEnergy;
        else this.angle = this.angle - this.kineticEnergy;
        if(this.lastKineticEnergy < this.kineticEnergy){
          this.swingDirection = "down";
          //remove energy from system
          this.potentialEnergy = this.potentialEnergy - this.energyLoss;
          this.maxkineticEnergy = map(this.potentialEnergy,0,PI,this.minimumEnergy, this.maxEnergy);
        }
      }

      if(this.potentialEnergy < this.energyLoss) this.potentialEnergy = 0;
      if(this.angle > PI) this.angle = this.angle - (2*PI);
      if(this.angle < -PI) this.angle = this.angle + (2*PI);

    }//end swing if not still
  } // end update


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
