import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [ballPosition, setBallPosition] = useState({ x: 200, y: 200 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const friction = 0.98; 
  const canvasSize = { width: window.innerWidth - 40, height: window.innerHeight - 40 };

  const handleCanvasClick = (e) => {
    const canvas = document.getElementById("canvas");
    const rect = canvas.getBoundingClientRect();
    const targetX = e.clientX - rect.left;
    const targetY = e.clientY - rect.top;
    const angle = Math.atan2(targetY - ballPosition.y, targetX - ballPosition.x);
    const speed = 60;

    setVelocity({ vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed });
    setIsMoving(true);
  };

  const moveBall = () => {
    if (!isMoving) return;

    setBallPosition((prev) => {
      let { x, y } = prev;
      let { vx, vy } = velocity;

      x += vx;
      y += vy;

      if (x + 22 > canvasSize.width || x - 22 < 0) {
        vx = -vx;
        x = Math.min(canvasSize.width - 22, Math.max(22, x));
      }
      if (y + 22 > canvasSize.height || y - 22 < 0) {
        vy = -vy;
        y = Math.min(canvasSize.height - 22, Math.max(22, y));
      }

      vx *= friction;
      vy *= friction;

      if (Math.abs(vx) < 0.1 && Math.abs(vy) < 0.1) {
        vx = 0;
        vy = 0;
        setIsMoving(false); 
      }

      setVelocity({ vx, vy });
      return { x, y };
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      moveBall();
    }, 16); 

    return () => clearInterval(interval);
  });
return (
    <div id="canvas" onClick={handleCanvasClick}>
      <div
        id="ball"
        style={{
          left: `${ballPosition.x - 22}px`,
          top: `${ballPosition.y - 22}px`,
        }}
      ></div>
      
      {!isMoving && (
        <div id="instructions">Click to Launch the Ball!</div>
      )}
    </div>
  );
};
export default App;

