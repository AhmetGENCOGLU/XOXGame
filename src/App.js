import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const defaultCells = ["", "", "", "", "", "", "", "", ""];
  const [cells, setCells] = useState(defaultCells);
  const [isFirstUser, setIsFirstUser] = useState(true);
  const [firstUserScore, setFirstUserScore] = useState(0);
  const [secondUserScore, setSecondUserScore] = useState(0);
  const [winningMessage, setWinningMessage] = useState(null);
  const gameOverScore = 2;

  const isEmpty = (cell) => {
    return cell === "";
  };

  useEffect(() => {
    let options = localStorage.getItem('XOX');
    if (options) {
      let parsedOptions = JSON.parse(options);
      setCells(parsedOptions.cells);
      setIsFirstUser(parsedOptions.isFirstUser);
      setFirstUserScore(parsedOptions.firstUserScore);
      setSecondUserScore(parsedOptions.secondUserScore);
    } else {
      setCells(defaultCells);
    }
  }, []);

  const writeLocalStorage = (isFirst) => {
    const options = {
      isFirstUser: isFirst,
      firstUserScore: firstUserScore,
      secondUserScore: secondUserScore,
      cells: cells,
    }
    localStorage.setItem('XOX', JSON.stringify(options));
  };

  useEffect(() => {
    if (firstUserScore === gameOverScore) {
      setWinningMessage("First user won");
      setFirstUserScore(0);
      setSecondUserScore(0);
      setIsFirstUser(true);
    } else if (secondUserScore === gameOverScore) {
      setWinningMessage("Second user won");
      setFirstUserScore(0);
      setSecondUserScore(0);
      setIsFirstUser(false);
    }
  }, [firstUserScore, secondUserScore]);

  useEffect(() => {
    if (winningMessage) {
      setTimeout(() => {
        setWinningMessage(null);
      }, 2000);
    }
  }, [winningMessage]);

  const isSuccess = (cellss) => {
    return (
      (cellss[0] === cellss[1] &&
        cellss[1] === cellss[2] &&
        !isEmpty(cellss[0])) ||
      (cellss[3] === cellss[4] &&
        cellss[4] === cellss[5] &&
        !isEmpty(cellss[3])) ||
      (cellss[6] === cellss[7] &&
        cellss[7] === cellss[8] &&
        !isEmpty(cellss[6])) ||
      (cellss[0] === cellss[3] &&
        cellss[3] === cellss[6] &&
        !isEmpty(cellss[0])) ||
      (cellss[1] === cellss[4] &&
        cellss[4] === cellss[7] &&
        !isEmpty(cellss[1])) ||
      (cellss[2] === cellss[5] &&
        cellss[5] === cellss[8] &&
        !isEmpty(cellss[2])) ||
      (cellss[0] === cellss[4] &&
        cellss[4] === cellss[8] &&
        !isEmpty(cellss[0])) ||
      (cellss[2] === cellss[4] &&
        cellss[4] === cellss[6] &&
        !isEmpty(cellss[2]))
    );
  };

  const isFullCells = (cellss) => {
    return cellss.every((child) => child !== "");
  };

  const onClickCell = (index) => {
    if (isEmpty(cells[index])) {
      let existCells = cells;
      existCells[index] = isFirstUser ? "X" : "O";
      setCells(existCells);
      setIsFirstUser(!isFirstUser);
      if (isSuccess(existCells) && isFirstUser) {
        setFirstUserScore(firstUserScore + 1);
        setCells(defaultCells);
      } else if (isSuccess(existCells) && !isFirstUser) {
        setSecondUserScore(secondUserScore + 1);
        setCells(defaultCells);
      } else if (!isSuccess(existCells) && isFullCells(existCells)) {
        setCells(defaultCells);
      }
      writeLocalStorage(!isFirstUser);
    } else {
      alert("Cell isnt empty");
    }
  };

  if (winningMessage) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {winningMessage}
      </div>
    );
  }

  const onReset = () => {
    localStorage.removeItem('XOX');
    setIsFirstUser(true);
    setFirstUserScore(0);
    setSecondUserScore(0);
    setCells(defaultCells);
  };

  return (
    <div className="App">
      <button style={{ position: 'fixed', top: '15px' }} onClick={onReset}>Reset</button>
      <div className="box firstUser">
        <div className={`title ${isFirstUser && "active"}`}>User 1</div>
        <div className="score">{firstUserScore}</div>
      </div>
      <div className="box gameZone">
        {cells.map((child, index) => (
          <div
            key={index}
            className="gameCell"
            onClick={() => onClickCell(index)}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="box secondUser">
        <div className={`title ${!isFirstUser && "active"}`}> User 2</div>
        <div className="score">{secondUserScore}</div>
      </div>
    </div>
  );
};

export default App;
