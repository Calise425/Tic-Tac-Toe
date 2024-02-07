import React, { useState } from "react";
import ReactDOM from "react-dom";

const TicTacToe = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [numPlayers, setNumPlayers] = useState(1);
  const [playerDisplay, setPlayerDisplay] = useState("Player 1's Turn");
  const [symbol, setSymbol] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // This function maps over the possible winning positions to see
  // if any of them are all 3 matching, and if they are,
  // sets the winner to that symbol/player.
  const checkWin = (boardArray) => {
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (
        boardArray[a] &&
        boardArray[a] === boardArray[b] &&
        boardArray[a] === boardArray[c]
      ) {
        setGameOver(true);
        if (boardArray[a] === "X") {
          if (numPlayers === 1) {
            setWinner("You win!");
          } else {
            setWinner("Player 1 wins!");
          }
        } else if (boardArray[a] === "O") {
          if (numPlayers === 1) {
            setWinner("Computer wins");
          } else {
            setWinner("Player 2 wins!");
          }
        }
      }
    }
    if (!boardArray.includes("")) {
      setGameOver(true);
      setWinner("It's a tie");
      return;
    }
  };

  // The computer will prioritize winning squares/ blocking players from winning
  // if 2 other squares in the winning positions array are the same.
  // a temp array is used to account for the react state not updating in time
  const computerTurn = (tempArray) => {
    if (gameOver) {
      return;
    }
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (tempArray[a] && tempArray[a] === tempArray[b] && !tempArray[c]) {
        tempArray[c] = "O";
        setBoard(tempArray);
        checkWin(tempArray);
        setPlayerDisplay("Player 1's Turn");
        return;
      } else if (
        tempArray[a] &&
        tempArray[a] === tempArray[c] &&
        !tempArray[b]
      ) {
        tempArray[b] = "O";
        setBoard(tempArray);
        checkWin(tempArray);
        setPlayerDisplay("Player 1's Turn");
        return;
      } else if (
        tempArray[b] &&
        tempArray[b] === tempArray[c] &&
        !tempArray[a]
      ) {
        tempArray[a] = "O";
        setBoard(tempArray);
        checkWin(tempArray);
        setPlayerDisplay("Player 1's Turn");
        return;
      }
    }
    if (!tempArray[4]) {
      tempArray[4] = "O";
      setBoard(tempArray);
      checkWin(tempArray);
      setPlayerDisplay("Player 1's Turn");
      return;
    } else {
      tempArray[tempArray.indexOf("")] = "O";
      setBoard(tempArray);
      checkWin(tempArray);
      setPlayerDisplay("Player 1's Turn");
      return;
    }
  };

  // Function ran on reset button to clear the state of the board
  const reset = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setSymbol("X");
    setPlayerDisplay("Player 1's Turn");
    setWinner("");
    setGameOver(false);
  };

  // Function ran when a cell is clicked by a player, updating the board array state
  // as well as changing the symbol/player to the opposite depending on 1p/2p
  const cellClicked = (i) => {
    if (gameOver) {
      return;
    } else {
      const tempArray = [...board];
      tempArray[i] = symbol;
      setBoard(tempArray);
      checkWin(tempArray);

      if (!gameOver) {
        if (numPlayers === 1) {
          setPlayerDisplay("Computer's Turn");
          setTimeout(() => {
            computerTurn(tempArray);
          }, 750);
        } else {
          symbol === "X" ? setSymbol("O") : setSymbol("X");
          playerDisplay === "Player 1's Turn"
            ? setPlayerDisplay("Player 2's Turn")
            : setPlayerDisplay("Player 1's Turn");
        }
      }
    }
  };

  return (
    <div id="playing-field">
      <h1>Tic-Tac-Toe</h1>
      {!gameOver ? <h3>{playerDisplay}</h3> : null}
      {gameOver ? <h3>{winner}</h3> : null}
      <div id="board">
        {board.map((cell, i) => {
          if (!cell.length) {
            return (
              <div className="cell" key={i}>
                <button
                  className="cell-button"
                  onClick={() => cellClicked(i)}
                ></button>
              </div>
            );
          } else if (cell === "X") {
            return (
              <div className="cell" key={i}>
                <h2>X</h2>
              </div>
            );
          } else {
            return (
              <div className="cell" key={i}>
                <h2>O</h2>
              </div>
            );
          }
        })}
      </div>
      <div id="button-footer">
        <button id="reset-button" onClick={(e) => reset()}>
          Reset
        </button>
        {numPlayers === 1 ? (
          <button
            className="player-button"
            onClick={() => {
              setNumPlayers(2);
              reset();
            }}
          >
            One Player
          </button>
        ) : (
          <button
            className="player-button"
            onClick={() => {
              setNumPlayers(1);
              reset();
            }}
          >
            Two Players
          </button>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<TicTacToe />, document.getElementById("app"));
