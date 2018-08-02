function allPieces(){
  this.boardPieces = [];

//call to update from server
  this.createOrUpdate = function(id, x, y, type){
    var tempPiece = this.getById(id);
    if(tempPiece == null){
      tempPiece = new Piece(id, x, y, type);
      this.boardPieces.push(tempPiece);
      // console.log("Create Piece ID", id);
    } else {
      tempPiece.serverUpdate(x, y);
      // tempPiece.count = count;
    }
  }


  //returns all pieces on that square
  this.getSquare = function(x , y){
    // console.log("GetSquare: ", x, y);
    var piecesInSquare = [];
    for(var i = 0; i < this.boardPieces.length; i++){
        if((x === this.boardPieces[i].posX) && (y === this.boardPieces[i].posY)){
            piecesInSquare.push(this.boardPieces[i]);
          }
    }
    // console.log("BEFORE Return", piecesInSquare);
    return piecesInSquare;
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

  this.checkCounts = function(){
    //clear all previous offsets
    this.boardPieces.forEach((piece)=>{
      piece.offsetX = 0;
    });

    //look through all tiles for multiple peices
    for(var x = 0; x < 1100; x=x+100){
      for(var y = 0; y < 800; y=y+100){
        var squarePieces = this.getSquare(x,y);
        // console.log(x,y,squarePieces);
        if(squarePieces.length > 1){
          console.log("Found tile with multiple Pieces at ", x, y, squarePieces);
          let range = squarePieces.length;
          for(var i=0; i<range; i++){
            let offset = map(i, 0, (range-1), -10, 10);
            squarePieces[i].offsetX = offset;
          }
        }
      }
    }
  }// end checkCounts


  this.mouseMove = function(currPiece){
    currPiece.moving = true;
    let x = Math.floor(mouseX);
    let y = Math.floor(mouseY);
    currPiece.x = x;
    currPiece.y = y;
    return currPiece;
  }


  this.snap = function(currPiece){
    //get board cell mouse released in
    let diffX = mouseX % 100;
    let diffY = mouseY % 100;
    let setX = Math.floor(mouseX - diffX);
    let setY = Math.floor(mouseY - diffY);

    currPiece.moveTo(setX, setY);
    return currPiece;
  }

}// end allPieces class
