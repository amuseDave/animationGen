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

export function getSquarePos({ position, squareSize, height, width }) {
  let x;
  let y;

  const { boxWidth, boxHeight } = getBoxWidthHeight(width);
  const boxX = width / 2 - boxWidth / 2;
  const boxY = height / 2 - boxHeight / 2;

  console.log(position);

  const positionMap = {
    cc: [width / 2 - squareSize / 2, height / 2 - squareSize / 2],
    ct: [width / 2 - squareSize / 2, height / 2 - squareSize],
    cb: [width / 2 - squareSize / 2, height / 2],
    cl: [width / 2 - squareSize, height / 2 - squareSize / 2],
    cr: [width / 2, height / 2 - squareSize / 2],
    lc: [boxX, height / 2 - squareSize / 2],
    lco: [boxX - squareSize, height / 2 - squareSize / 2],
    rc: [boxX + boxWidth - squareSize, height / 2 - squareSize / 2],
    rco: [boxX + boxWidth, height / 2 - squareSize / 2],
    tco: [width / 2 - squareSize / 2, boxY - squareSize],
    tlot: [boxX, boxY - squareSize],
    trot: [boxX + boxWidth - squareSize, boxY - squareSize],
    tlol: [boxX - squareSize, boxY],
    tror: [boxX + boxWidth, boxY],
    bco: [width / 2 - squareSize / 2, boxY + boxHeight],
    blob: [boxX, boxY + boxHeight],
    brob: [boxX + boxWidth - squareSize, boxY + boxHeight],
    blol: [boxX - squareSize, boxY + boxHeight - squareSize],
    bror: [boxX + boxWidth, boxY + boxHeight - squareSize],
    tc: [width / 2 - squareSize / 2, boxY],
    tl: [boxX, boxY],
    tr: [boxX + boxWidth - squareSize, boxY],
    bc: [width / 2 - squareSize / 2, boxY + boxHeight - squareSize],
    bl: [boxX, boxY + boxHeight - squareSize],
    br: [boxX + boxWidth - squareSize, boxY + boxHeight - squareSize],
  };
  [x, y] = positionMap[position];

  return { x, y };
}
