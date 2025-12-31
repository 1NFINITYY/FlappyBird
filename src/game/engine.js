import {
  BIRD_SIZE,
  PIPE_WIDTH,
  PIPE_GAP,
  PIPE_SPAWN_RATE,
} from "./constants";

export function updateBird(state, gravity) {
  state.velocity += gravity;
  state.birdY += state.velocity;
}

export function spawnPipe(state, canvasHeight, canvasWidth) {
  const minGapTop = 50;
  const maxGapTop = canvasHeight - PIPE_GAP - 50;
  const topHeight = Math.random() * (maxGapTop - minGapTop) + minGapTop;

  state.pipes.push({
    x: canvasWidth,
    top: topHeight,
    bottom: topHeight + PIPE_GAP,
    passed: false,
  });
}

export function updatePipes(state, speed) {
  state.pipes.forEach((p) => (p.x -= speed));
  state.pipes = state.pipes.filter((p) => p.x + PIPE_WIDTH > 0);
}

export function checkCollisions(state, canvasHeight, onGameOver) {
  state.pipes.forEach((p) => {
    if (
      state.birdX + BIRD_SIZE > p.x &&
      state.birdX < p.x + PIPE_WIDTH &&
      (state.birdY < p.top || state.birdY + BIRD_SIZE > p.bottom)
    ) {
      onGameOver();
    }

    if (!p.passed && p.x + PIPE_WIDTH < state.birdX) {
      state.score += 1;
      p.passed = true;
    }
  });

  if (
    state.birdY + BIRD_SIZE > canvasHeight ||
    state.birdY < 0
  ) {
    onGameOver();
  }
}

export function shouldSpawnPipe(frame) {
  return frame % PIPE_SPAWN_RATE === 0;
}
