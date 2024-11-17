export default function handleCanvas(canvasEl, ctx) {
  const { width, height } = canvasEl;
  const boxWidth = width / 3;
  const boxHeight = width / 4;
  const square = width / 10;

  ctx.fillStyle = "#f3f3f3";
  ctx.fillRect(width / 2 - square / 2, height / 2 - square / 2, square, square);

  ctx.strokeStyle = "#333";
  ctx.lineWidth = "5";
  ctx.setLineDash([20]);
  ctx.strokeRect(
    width / 2 - boxWidth / 2,
    height / 2 - boxHeight / 2,
    boxWidth,
    boxHeight
  );
}
