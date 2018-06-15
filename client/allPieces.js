function allPieces(){
  this.allPieces = [
    new Piece(0,0,"whiteRook", 1),
    new Piece(100,0,"whiteKnight", 1),
    new Piece(200,0,"whiteBishop", 1),
    new Piece(300,0,"whiteKing", 1),
    new Piece(400,0,"whiteQueen", 1),
    new Piece(500,0,"whiteBishop", 1),
    new Piece(600,0,"whiteKnight", 1),
    new Piece(700,0,"whiteRook", 1),

    new Piece(0,700,"blackRook", 1),
    new Piece(100,700,"blackKnight", 1),
    new Piece(200,700,"blackBishop", 1),
    new Piece(300,700,"blackKing", 1),
    new Piece(400,700,"blackQueen", 1),
    new Piece(500,700,"blackBishop", 1),
    new Piece(600,700,"blackKnight", 1),
    new Piece(700,700,"blackRook", 1)
  ];

  for (var i=0; i<8; i++){
    this.allPieces.push(
      new Piece(100*i,100,"whitePawn")
    );
    this.allPieces.push(
      new Piece(100*i,600,"blackPawn")
    );
  }

  this.getClicked = function(){
    var tempReturn = null;
    this.allPieces.forEach((piece)=>{
      if(piece.clicked()){
        tempReturn = piece;
      }
    });
    return tempReturn;
  }

  this.draw = function(){
    this.allPieces.forEach((piece)=>{
      piece.draw();
    });
  }

  this.take = function(currPiece){
    //the problem is that the currPiece is INCLUDED in this.allPieces, so it will always be true
    // for(var i = 0; i < this.allPieces.length;i++){
    //   if((currPiece.x == this.allPieces[i].x) && (currPiece.y == this.allPieces[i].y)){
    //     this.allPieces[i].x = 900;
    //     this.allPieces[i].y = 0;
    //     }
    //   }
  }

}
