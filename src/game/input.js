export function bindControls({ onJump, onStart }) {
  const keyHandler = (e) => {
    if (e.code === "Space") {
      onStart();
      onJump();
    }
  };

  window.addEventListener("keydown", keyHandler);

  return () => {
    window.removeEventListener("keydown", keyHandler);
  };
}
