import { useRef, useEffect, useState } from "react";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PIPE_SPEED,
  GRAVITY,
  JUMP_FORCE,
} from "../game/constants";
import {
  updateBird,
  spawnPipe,
  updatePipes,
  checkCollisions,
  shouldSpawnPipe,
} from "../game/engine";
import { render } from "../game/renderer";
import { bindControls } from "../game/input";

export default function FlappyBird() {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);

  const stateRef = useRef({
    birdX: 50,
    birdY: 150,
    velocity: 0,
    pipes: [],
    score: 0,
    highScore: 0,
    frame: 0,
    gameRunning: false,
  });

  const resetGame = () => {
    const s = stateRef.current;
    s.highScore = Math.max(s.highScore, s.score);
    s.birdY = 150;
    s.velocity = 0;
    s.pipes = [];
    s.score = 0;
    s.frame = 0;
    s.gameRunning = false;
    setGameStarted(false);
  };

  const startGame = () => {
    const s = stateRef.current;
    if (s.gameRunning) return;
    s.velocity = JUMP_FORCE;
    s.gameRunning = true;
    setGameStarted(true);
  };

  const jump = () => {
    if (stateRef.current.gameRunning) {
      stateRef.current.velocity = JUMP_FORCE;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const unbind = bindControls({
      onJump: jump,
      onStart: startGame,
    });

    const loop = () => {
      const s = stateRef.current;

      if (s.gameRunning) {
        s.frame++;
        updateBird(s, GRAVITY);

        if (shouldSpawnPipe(s.frame)) {
          spawnPipe(s, canvas.height, canvas.width);
        }

        updatePipes(s, PIPE_SPEED);
        checkCollisions(s, canvas.height, resetGame);
      }

      render(ctx, canvas, s);
      requestAnimationFrame(loop);
    };

    loop();
    return unbind;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 p-4">
      <div className="relative bg-white/80 rounded-2xl shadow-2xl p-4">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border border-gray-800 rounded-lg"
          onMouseDown={() => {
            if (!stateRef.current.gameRunning) startGame();
            else jump();
          }}
        />

        {!gameStarted && (
          <button
            onClick={startGame}
            className="absolute inset-0 bg-black/30 text-white
                       flex flex-col items-center justify-center
                       rounded-2xl text-2xl font-bold"
          >
            Flappy Bird
            <span className="text-sm font-normal mt-1">
              Click / Tap / SPACE
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
