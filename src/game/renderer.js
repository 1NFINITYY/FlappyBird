import { BIRD_SIZE, PIPE_WIDTH } from "./constants";

export function render(ctx, canvas, state) {
  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, "#6dd5fa");
  bg.addColorStop(1, "#2980b9");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Pipes
  state.pipes.forEach((p) => {
    const grad = ctx.createLinearGradient(p.x, 0, p.x + PIPE_WIDTH, 0);
    grad.addColorStop(0, "#2ecc71");
    grad.addColorStop(1, "#27ae60");
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.roundRect(p.x, 0, PIPE_WIDTH, p.top, 10);
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(
      p.x,
      p.bottom,
      PIPE_WIDTH,
      canvas.height - p.bottom,
      10
    );
    ctx.fill();
  });

  // Bird shadow
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.ellipse(
    state.birdX + 15,
    state.birdY + 35,
    18,
    6,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Bird
  ctx.fillStyle = "#f1c40f";
  ctx.beginPath();
  ctx.roundRect(
    state.birdX,
    state.birdY,
    BIRD_SIZE,
    BIRD_SIZE,
    8
  );
  ctx.fill();

  // Eye
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(state.birdX + 20, state.birdY + 10, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(state.birdX + 22, state.birdY + 10, 3, 0, Math.PI * 2);
  ctx.fill();

  // Score
  ctx.fillStyle = "white";
  ctx.font = "bold 26px Arial";
  ctx.fillText(`Score: ${state.score}`, 140, 40);
  ctx.font = "18px Arial";
  ctx.fillText(`High: ${state.highScore}`, 160, 70);
}
