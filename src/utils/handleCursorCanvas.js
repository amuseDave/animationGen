import cursorDefault from "../assets/cursor-default.png";
import cursorMove from "../assets/cursor-move.png";
import cursorGrab from "../assets/cursor-grab.png";
import translateSquare from "../assets/svgs/translateSquare.svg";

const cursorD = new Image();
cursorD.src = cursorDefault;

const cursorM = new Image();
cursorM.src = cursorMove;

const cursorG = new Image();
cursorG.src = cursorGrab;

const translateSqureImg = new Image();
translateSqureImg.src = translateSquare;

export default function drawCursor(x, y, ctx, cursor) {
  ctx.clearRect(0, 0, 4000, 4000);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.shadowColor = "rgba(0, 255, 255, 0.2)";
  ctx.shadowBlur = 20;

  if (cursor === "default") ctx.drawImage(cursorD, x, y);
  if (cursor === "move") ctx.drawImage(cursorM, x, y);
  if (cursor === "grab") ctx.drawImage(cursorG, x, y);
}

export function drawTranslateCanvas(x, y, ctx) {
  ctx.clearRect(0, 0, 250, 250);

  ctx.drawImage(translateSqureImg, x - 20 / 2, y - 20 / 2);
}
