function allPieces(){
  this.boardPieces = [];

  this.newGame = function(){
    this.boardPieces = [
      new Piece("whiteRook1",0,0,"whiteRook", 1),
      new Piece("whiteKnight1",100,0,"whiteKnight", 1),
      new Piece("whiteBishop1",200,0,"whiteBishop", 1),
      new Piece("whiteKing",300,0,"whiteKing", 1),
      new Piece("whiteQueen",400,0,"whiteQueen", 1),
      new Piece("whiteBishop2",500,0,"whiteBishop", 1),
      new Piece("whiteKnight2",600,0,"whiteKnight", 1),
      new Piece("whiteRook2",700,0,"whiteRook", 1),

      new Piece("blackRook1",0,700,"blackRook", 1),
      new Piece("blackKnight1",100,700,"blackKnight", 1),
      new Piece("blackBishop1",200,700,"blackBishop", 1),
      new Piece("blackKing",300,700,"blackKing", 1),
      new Piece("blackKing",400,700,"blackQueen", 1),
      new Piece("blackBishop2",500,700,"blackBishop", 1),
      new Piece("blackKnight2",600,700,"blackKnight", 1),
      new Piece("blackRook2",700,700,"blackRook", 1)
    ];

    for (var i=0; i<8; i++){
      this.boardPieces.push(
        new Piece("whitePawn"+i,100*i,100,"whitePawn",1)
      );
      this.boardPieces.push(
        new Piece("blackPawn"+i,100*i,600,"blackPawn",1)
      );
    }
  } // new game
  this.getSquare = function(x , y){
    for(var i = 0; i < this.boardPieces.length;i++){
        if((x === this.boardPieces[i].x) && (y === this.boardPieces[i].y)){
            return this.boardPieces[i];
          }
    }
            return null;
  }


  this.getClicked = function(){
    var tempReturn = null;
    this.boardPieces.forEach((piece)=>{
      if(piece.clicked()){
        tempReturn = piece;
      }
    });
    return tempReturn;
  }

  this.getById = function(id){
    var index = 0;
    var found = false;
    while(index < this.boardPieces.length){
      if(this.boardPieces[index].id === id){
        found = true;
        break;
      }
      index++;
    }
    if(found) return this.boardPieces[index];
    else return null;
  }

  this.removeById = function(id){
    var index = 0;
    var found = false;
    while(index < this.boardPieces.length){
      if(this.boardPieces[index].id === id){
        found = true;
        break;
      }
      index++;
    }
    if(found) this.boardPieces.splice(index,1);
    return found;
  }

  this.draw = function(){
    this.boardPieces.forEach((piece)=>{
      piece.draw();
    });
  }

  this.update = function(){
    this.boardPieces.forEach((piece)=>{
      piece.update();
    });
  }

  this.stack = function(currPiece){
    for(var i = 0; i < this.boardPieces.length;i++){
      if((currPiece.x === this.boardPieces[i].x) &&    //same column
         (currPiece.y === this.boardPieces[i].y) &&    //same row
         (currPiece.id != this.boardPieces[i].id) &&   //not same id (isnt itself)
         (currPiece.type === this.boardPieces[i].type) &&     //IS the same type
         (currPiece.side() === this.boardPieces[i].side() )){ //IS on the same side white/black
            this.boardPieces[i].count = this.boardPieces[i].count + currPiece.count;
            this.removeById(currPiece.id);
      }
    }
  }

  this.take = function(currPiece){
    //the problem is that the currPiece is INCLUDED in this.allPieces, so it will always be true
    for(var i = 0; i < this.boardPieces.length;i++){
      if((currPiece.x === this.boardPieces[i].x) &&    //same column
         (currPiece.y === this.boardPieces[i].y) &&    //same row
         (currPiece.id != this.boardPieces[i].id) &&   //not same id (isnt itself)
         (currPiece.side() != this.boardPieces[i].side() )){ //NOT on the same side white/black
            this.boardPieces[i].x = this.boardPieces[i].graveX;
            this.boardPieces[i].y = this.boardPieces[i].graveY;
            var square =this.getSquare(this.boardPieces[i].x,this.boardPieces[i].y);
            console.log("getSquare", square);
            this.stack(square);
            // allPieces.stack(currPiece);
      }
    }
  }//end take


  this.mouseMove = function(currPiece){
    let x = Math.floor(mouseX - currPiece.pivotX);
    let y = Math.floor(mouseY - currPiece.pivotY);
    // let v1 = createVector(currPiece.x, currPiece.y);
    // let v2 = createVector(x, y);
    // let v3 = p5.Vector.sub(v2, v1);
    // v3.rotate(HALF_PI);
    // let mag = Math.round(v3.mag()*100)/100;
    // let heading = Math.round(v3.heading()*100)/100;
    // currPiece.addSwing(heading, mag);
    currPiece.x = x;
    currPiece.y = y;
    return currPiece;
  }


  this.snap = function(currPiece){
    let diffX = mouseX % 100;
    let diffY = mouseY % 100;

    currPiece.x = Math.floor(mouseX - diffX);
    currPiece.y = Math.floor(mouseY - diffY);
    return currPiece;
  }

}// end allPieces class
