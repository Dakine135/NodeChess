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
      tempPiece.x = x;
      tempPiece.y = y;
      // tempPiece.count = count;
    }
  }


  this.getSquare = function(x , y){
    for(var i = 0; i < this.boardPieces.length; i++){
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
