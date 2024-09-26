var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};



Knight.prototype = new Piece({});
// Knight.prototype.move = function(newPosition){


// }


Knight.prototype.moveTo = function(cell) {
    const currentPosition = this.position;
    console.log(cell);
    const newRow = cell.row;
    const newCol = cell.col;

    // const targetPiece = this.board.getPieceAt(cell);
    // console.log(targetPiece.row);
    
    
    if (!this.isValidMove(currentPosition, newRow, newCol)) {
        console.warn("Invalid move for Knight");
        return;
    }
    this.position = newCol + newRow;
    this.render();
    // if (this.kill(cell)) {
    //     // If a kill occurred, update the position
    //     this.position = newCol + newRow;
    //     this.render();
    //     return;
    // }
}
    Knight.prototype.isValidMove = function(currentPosition, newRow, newCol) {
        // Convert the current position from letter and number to coordinates
        const currentCol = currentPosition[0].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;
        console.log(currentCol);
        const currentRow = parseInt(currentPosition[1], 10);
        console.log(currentRow);
      
        // Convert the newCol from letter to number
        const newColNum = newCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;
      
        // Calculate the row and column differences
        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newColNum - currentCol);
      
        // A valid Knight move is 2 squares in one direction and 1 in the other
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
      };
      
      Knight.prototype.kill = function(cell) {
        const targetPiece = this.board.getPieceAt(cell);
        
        if (targetPiece && targetPiece.color !== this.color) {
            console.log(`Knight at ${this.position} kills piece at ${cell.col}${cell.row}`);
            
            // 1. Remove the piece from the DOM
            if (targetPiece.$el) {
                targetPiece.$el.remove();  // Remove the element from the board
            }
            
            // 2. Remove the piece from the board's data structure
            if (targetPiece.color === 'white') {
                this.removePieceFromBoard(this.board.whitePieces, targetPiece);
            } else {
                this.removePieceFromBoard(this.board.blackPieces, targetPiece);
            }
    
            return true;  // Successfully killed the piece
        }
        
        return false;  // No piece killed
    };
    
    // Helper method to remove the piece from the Board's piece data
    Knight.prototype.removePieceFromBoard = function(pieceSet, targetPiece) {
        for (let pieceType in pieceSet) {
            if (Array.isArray(pieceSet[pieceType])) {
                // For piece types that have multiple instances (pawns, rooks, etc.)
                const pieceIndex = pieceSet[pieceType].indexOf(targetPiece);
                if (pieceIndex > -1) {
                    pieceSet[pieceType].splice(pieceIndex, 1);  // Remove the piece from the array
                    return;
                }
            } else {
                // For single-instance pieces (king, queen))
                if (pieceSet[pieceType] === targetPiece) {
                    delete pieceSet[pieceType];  // Remove the piece
                    return;
                }
            }
        }
    };
    