var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};


Pawn.prototype = new Piece({});

Pawn.prototype.moveTo = function(cell) {
  console.log(this.position)
    const currentPosition = this.position;
    console.log(cell)
    const newRow = cell.row;
    const newCol = cell.col;
    
    if (!this.isValidMove(currentPosition, newRow, newCol)) {
      console.warn("Invalid move for pawn");
      return;
    }
    this.position = newCol + newRow;
    this.render();
  };
  
  Pawn.prototype.isValidMove = function(currentPosition, newRow, newCol) {
    const currentRow = parseInt(currentPosition.slice(1));
    const currentCol = currentPosition.charAt(0);
    if (this.color === 'white' && newRow > currentRow) {
      if (newRow - currentRow === 1 && newCol === currentCol) {
        return true;
      }
      if (currentRow === 2 && newRow - currentRow === 2 && newCol === currentCol) {
        return true;
      }
    } else if (this.color === 'black' && newRow < currentRow) {
      
      if (newRow - currentRow === -1 && newCol === currentCol) {
        return true;
      }
      if (currentRow === 7 && newRow - currentRow === -2 && newCol === currentCol) {
        return true;
      }
    }
    return false;
  };
