export default function handleCanvasCustomState({
  width,
  height,
  ctx,
  square,
}) {
  drawDefaultCanvas(width, height, ctx);
  drawDashedSquare(width, height, ctx);

  ctx.fillStyle = "#f3f3f3";
  const squareSize = getSquareSize(width);
  ctx.fillRect(square.x, square.y, squareSize, squareSize);
}

function drawDashedSquare(width, height, ctx) {
  const { boxWidth, boxHeight } = getBoxWidthHeight(width);

  ctx.strokeStyle = "#777";
  ctx.lineWidth = width / 450;
  ctx.setLineDash([width / 50]);
  ctx.strokeRect(
    width / 2 - boxWidth / 2,
    height / 2 - boxHeight / 2,
    boxWidth,
    boxHeight
  );
}

export function drawDefaultCanvas(width, height, ctx) {
  ctx.clearRect(0, 0, 1500, 1100);

  let circlesX = 0;
  let circlesY = 0;

  while (circlesX * 20 <= width) {
    circlesX++;
  }
  while (circlesY * 20 <= height) {
    circlesY++;
  }

  ctx.fillStyle = "#333";
  for (let i = 0; i < circlesX; i++) {
    for (let j = 0; j < circlesY; j++) {
      ctx.beginPath();
      ctx.arc(i * 20 + 5, j * 20 + 5, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function getSquareSize(width) {
  return width / 10;
}

export function getBoxWidthHeight(width) {
  return { boxWidth: width / 3, boxHeight: width / 4 };
}
