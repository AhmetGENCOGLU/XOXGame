import { useState } from "react";
import './App.css';

const App = () => {
  const defaultCells = ["", "", "", "", "", "","", "", ""];
  const [cells, setCells] = useState(defaultCells);
  const [isFirstUser, setIsFirstUser] = useState(true);
  const [firstUserScore, setFirstUserScore] = useState(0);
  const [secondUserScore, setSecondUserScore] = useState(0);

  const isEmpty = (cell) => {
    return cell === ""
  };

  const isSuccess = (cellss) => {
    return (
      (
        (cellss[0] === cellss[1]) && (cellss[1] === cellss[2]) && !isEmpty(cellss[0])
      ) ||
      (
        (cellss[3] === cellss[4]) && (cellss[4] === cellss[5]) && !isEmpty(cellss[3])
      ) ||
      (
        (cellss[6] === cellss[7]) && (cellss[7] === cellss[8]) && !isEmpty(cellss[6])
      ) ||
      (
        (cellss[0] === cellss[3]) && (cellss[3] === cellss[6]) && !isEmpty(cellss[0])
      ) ||
      (
        (cellss[1] === cellss[4]) && (cellss[4] === cellss[7]) && !isEmpty(cellss[1])
      ) ||
      (
        (cellss[2] === cellss[5]) && (cellss[5] === cellss[8]) && !isEmpty(cellss[2])
      ) ||
      (
        (cellss[0] === cellss[4]) && (cellss[4] === cellss[8]) && !isEmpty(cellss[0])
      ) ||
      (
        (cellss[2] === cellss[4]) && (cellss[4] === cellss[6]) && !isEmpty(cellss[2])
      )
    )
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
      }
    } else {
      alert("Cell isnt empty");
    }
  };
  
  return (
    <div className="App">
      <div className='box firstUser'>
        <div className={`title ${ isFirstUser && "active" }`}>User 1</div>
        <div className='score'>
          {firstUserScore}
        </div>
      </div>
      <div className='box gameZone'>
        {cells.map((child, index) => (
          <div key={index} className='gameCell' onClick={() => onClickCell(index)}>
            {child}
          </div>
        ))}
      </div>
      <div className='box secondUser'>
        <div className={`title ${ !isFirstUser && "active" }`}> User 2</div>
        <div className='score'>
          {secondUserScore}
        </div>
      </div>
    </div>
  );
}

export default App;
