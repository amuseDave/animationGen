import cursorDefault from "../assets/cursor-default.png";
import cursorMove from "../assets/cursor-move.png";
import cursorGrab from "../assets/cursor-grab.png";

const cursorD = new Image();
cursorD.src = cursorDefault;

const cursorM = new Image();
cursorM.src = cursorMove;

const cursorG = new Image();
cursorG.src = cursorGrab;

export default function drawCursor(x, y, ctx, cursor) {
  ctx.clearRect(0, 0, 4000, 4000);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.shadowColor = "rgba(0, 255, 255, 0.2)";
  ctx.shadowBlur = 20;

  if (cursor === "default") ctx.drawImage(cursorD, x, y);
  if (cursor === "move") ctx.drawImage(cursorM, x, y, 28, 28);
  if (cursor === "grab") ctx.drawImage(cursorG, x, y, 28, 28);
}

export function drawTranslateCanvas(x, y, ctx) {
  ctx.clearRect(0, 0, 200, 200);

  ctx.fillStyle = "#999";
  ctx.strokeStyle = "#999";

  ctx.beginPath();

  ctx.arc(x + 10 / 2, y + 10 / 2, 10, 0, Math.PI * 2);
  ctx.fill();
}
