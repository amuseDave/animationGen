import translateSquare from "../assets/svgs/translateSquare.svg";

const translateSqureImg = new Image();
translateSqureImg.src = translateSquare;

export function drawTranslateCanvas(x, y, ctx) {
  ctx.clearRect(0, 0, 250, 250);

  ctx.drawImage(translateSqureImg, x - 20 / 2, y - 20 / 2);
}
