import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import {v4 as uuid} from "uuid" 

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

// function Board({ nrows, ncols, chanceLightStartsOn }) {
function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.25 }) {
  // console.log(chanceLightStartsOn, nrows, ncols)
  const [board, setBoard] = useState(createBoard());
  // console.log(`State board = ${board}`)


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      let row = []
      for (let x = 0; x < ncols; x++){
        row.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(row)
    } 
    // console.log(initialBoard)
    return initialBoard;
  }

  // const test = createBoard(nrows, ncols, chanceLightStartsOn)
  // console.log(createBoard(nrows, ncols, chanceLightStartsOn))

  
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => cell))
  }

  function flipCellsAround(coord) {
    // console.log(x,y)
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
     
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        // console.log(yCoord, xCoord, boardCopy)
        // if (boardCopy[yCoord][xCoord] === undefined) {
        //   console.log(`No cell at Coords ${yCoord}, ${xCoord}`)
        //   return
        // }
        // console.log(rows-1, cols-1)
        
       
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          // console.log(yCoord, xCoord)
          boardCopy[y][x] = !boardCopy[y][x];
          // console.log(boardCopy)

        } 
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = 
        oldBoard.map(row => [...row])
      
      // console.log(newBoard)
      // console.log(y)
      // console.log(newBoard[0])
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard)       
      flipCell(y-1,x, newBoard)       
      flipCell(y+1,x,newBoard)  
      flipCell(y,x-1,newBoard)
      flipCell(y,x+1,newBoard)

      // TODO: return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  if (hasWon()) {
    return <div>You Win!!!</div>
  }

  // make table board

  // TODO
  // console.log(board)
  return (
    <table className="Board">
      <tbody>
      {board.map((col, yIdx) => {
        return (
          <tr key={uuid()}>
            {col.map((row, xIdx) => <Cell key={`${yIdx}-${xIdx}`} flipCellsAroundMe={() => flipCellsAround(`${yIdx}-${xIdx}`)} isLit={row}/>)}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

export default Board;
