import React, { useRef, useState, useEffect } from "react";
import "./App.css";

let moveListener = null;
window.addEventListener("keyup", () => {
  console.log("stop moving");
  window.removeEventListener("keydown", moveListener);
});

function App() {
  const ref = useRef();
  const screen = {
    width: 500,
    height: 300,
    ratio: window.devicePixelRatio || 1,
  };
  const [playerPos, setPlayerPos] = useState({
    x: 0,
    y: screen.height * screen.ratio - 100,
  });

  const update = () => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    player(ctx, playerPos, canvas);
    window.requestAnimationFrame(() => {
      update();
    });
  };

  const handleMove = (e) => {
    const key = e.key.toLowerCase();
    switch (key) {
      case "d":
        setPlayerPos({ ...playerPos, x: (playerPos.x += 1) });
        break;
      case "a":
        setPlayerPos({ ...playerPos, x: (playerPos.x -= 1) });
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    moveListener = window.addEventListener("keydown", handleMove);
    window.requestAnimationFrame(() => update());
  });

  return (
    <canvas
      style={{ border: "1px solid black" }}
      ref={ref}
      width={screen.width * screen.ratio}
      height={screen.height * screen.ratio}
    />
  );
}

const player = (context, pos, canvas) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(pos.x, pos.y, 10, 10);
};

export default App;
