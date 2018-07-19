function allPieces(){
  this.boardPieces = [];

//call to update from server
  this.createOrUpdate = function(id, x, y, type, count){
    var tempPiece = this.getById(id);
    if(tempPiece == null){
      tempPiece = new Piece(id, x, y, type, count);
      this.boardPieces.push(tempPiece);
    } else {
      tempPiece.x = x;
      tempPiece.y = y;
      tempPiece.count = count;
    }
  }


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

    //if clicked has more than one count, then create new piece
    if(tempReturn && tempReturn.count > 1){
      //create new piece with unique id at cursor
      var newId = tempReturn.id;
      while(allPieces.getById(newId) != null){
        newId = newId + "#";
      }
      // tempReturn.count--;
      //
      var data = {
        id: tempReturn.id,
        newId: newId
      };
      socket.emit('unStackEvent', data);

      tempReturn = new Piece(newId, tempReturn.x, tempReturn.y, tempReturn.type, 1);
      // allPieces.boardPieces.push(tempReturn);


    } // end create new Piece at cursor

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
    // this.boardPieces.forEach((piece)=>{
    //   piece.update();
    // });
  }


  this.mouseMove = function(currPiece){
    currPiece.moving = true;
    let x = Math.floor(mouseX - currPiece.pivotX);
    let y = Math.floor(mouseY - currPiece.pivotY);
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
