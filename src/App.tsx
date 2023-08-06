import { MouseEvent, useState } from "react";
import "./App.css";

type Dots = {
  top: number;
  left: number;
};

function App() {
  const [dots, setDots] = useState<Dots[]>([]);
  const [historyDots, setHistoryDots] = useState<Dots[]>([]);

  const quandoUsuarioClica = (event: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const newDots = {
      top: clientY,
      left: clientX,
    };
    setDots([...dots, newDots]);
    setHistoryDots([...dots, newDots]);
  };

  const handleUserDoDots = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (dots.length == 0) {
      return;
    }

    setDots(dots.slice(0, -1));
  };

  const handleUserUndo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (
      historyDots.length - (historyDots.length - dots.length) ==
      historyDots.length
    ) {
      return;
    }

    setDots([
      ...dots,
      historyDots[historyDots.length - (historyDots.length - dots.length)],
    ]);
  };

  return (
    <div className="app" onClick={quandoUsuarioClica}>
      <button onClick={handleUserDoDots}>Desfazer</button>
      <button onClick={handleUserUndo}>Refazer</button>

      {dots.map((dot) => (
        <div key={Math.random() * 10000} className="dot" style={dot}></div>
      ))}
    </div>
  );
}

export default App;
