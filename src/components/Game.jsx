import React from "react"
import { Board } from "./board"
import { Stack, Button } from "@mui/material"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TurnRightIcon from '@mui/icons-material/TurnRight';

export class Game extends React.Component {
    constructor(props){
      super(props)
      this.state = {
          xIsNext: true,
          history: [{
            squares: Array(9).fill(null)
          }],
          stepNumber: 0
      }

      this.newGameBoard = {
        squares: Array(9).fill(null)
      }

      this.MARK_X = "X"
      this.MARK_O = "O"
    }

    
    toggleSquare(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      
      const current = history[history.length - 1]
      const squares = current.squares.slice();

      if (this.calculateWinner(squares) || squares[i]){
        return;
      }

      squares[i] = this.state.xIsNext ? this.MARK_X : this.MARK_O

      this.setState({
          xIsNext: !this.state.xIsNext,
          history: history.concat([{
            squares: squares
          }]),
          stepNumber: history.length
      })
    }

    calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }

    moveCanBeMade(squares){
      return squares.some(element => element === null);
    }

    jumpTo(step){
      const history = this.state.history
      this.setState({
        xIsNext: (step % 2) === 0,
        stepNumber: step,
        history: history.slice(0, step + 1)
      })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = this.calculateWinner(current.squares);
      const moveCanBeMade = this.moveCanBeMade(current.squares)

      let moves = []

      /* Generate move history */
      if (history.length > 1){
        moves = history.slice(1).map((step, moveNumber) => {

          return (
              <Button variant="text" key={moveNumber} 
              className="moveButton" 
              startIcon={<TurnRightIcon />}
              onClick={() => this.jumpTo(moveNumber)}
              >Go to move #{moveNumber} (player {(moveNumber % 2 === 0)? this.MARK_X: this.MARK_O})</Button>
          )
      })}

      /* Generate Info-Section */
      let infoSection;

      if (winner){
        infoSection = (
          <Alert className="winnerMessage gameSection" severity="success">
            <AlertTitle>Winner: {winner}</AlertTitle>
   
          </Alert>
          /*<div className="winnerMessage infoSection">Winner: {winner}</div>*/
        )
      } else if (moveCanBeMade) {
        infoSection = (
          /*<div className="infoSection">Next player: {((this.state.xIsNext)? this.MARK_X : this.MARK_O)}</div>*/
          <Alert className="gameSection" severity="info">
            <AlertTitle>Next Player: {((this.state.xIsNext)? this.MARK_X : this.MARK_O)}</AlertTitle>
          </Alert>
        )
      } else {
        infoSection = (
          /*<div className="infoSection">Next player: {((this.state.xIsNext)? this.MARK_X : this.MARK_O)}</div>*/
          <Alert className="gameSection" severity="error">
            <AlertTitle>No one has won</AlertTitle>
          </Alert>
        )
      }

      return (
        <div className="game">
          <div className="gameActionRow gameSection">
            <Button variant="text" key={0} 
                className="moveButton" 
                startIcon={<RestartAltIcon />}
                onClick={() => this.jumpTo(0)}>Start new Game</Button>
            </div>

          {infoSection}
          
          <div className="gameBoard gameSection">
            <Board 
              squares={current.squares}
              onClick={(moveCanBeMade)? (i) => {this.toggleSquare(i)}: () => {}}
            />
          </div>
          
          <div className="gameInfo">
            <h2>Move History</h2>
            <small>Click on move to jump back to this point</small>
            <Stack spacing={0}>
              {moves}
            </Stack>
          </div>
        </div>
      );
    }
  }
  