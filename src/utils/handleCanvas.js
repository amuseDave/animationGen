import img from "../assets/square.jpg";

const squareImg = new Image();
squareImg.src = img;

export default function handleCanvasCustomState({
  width,
  height,
  ctx,
  square,
  zoomLevel,
}) {
  ctx.clearRect(0, 0, 1500, 1100);
  drawDashedSquare(width, height, ctx, zoomLevel);
  ctx.fillStyle = "#181E1F";
  const squareSize = getSquareSize(width, zoomLevel);

  ctx.drawImage(squareImg, square.x, square.y, squareSize, squareSize);
  // ctx.fillRect();
}

function drawDashedSquare(width, height, ctx, zoomLevel) {
  const { boxWidth, boxHeight } = getBoxWidthHeight(width, zoomLevel);

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

export function drawDefaultCanvas(ctx) {
  let circlesX = 0;
  let circlesY = 0;

  while (circlesX * 20 <= 1920) {
    circlesX++;
  }
  while (circlesY * 20 <= 1080) {
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

export function getSquareSize(width, zoomLevel = 1) {
  return (width / 10) * zoomLevel;
}

export function getBoxWidthHeight(width, zoomLevel = 1) {
  return {
    boxHeight: (width / 4) * zoomLevel,
    boxWidth: (width / 3) * zoomLevel,
  };
}

export function getSquarePos({
  position,
  squareSize,
  height,
  width,
  zoomLevel,
}) {
  let x;
  let y;

  const { boxWidth, boxHeight } = getBoxWidthHeight(width, zoomLevel);
  const boxX = width / 2 - boxWidth / 2;
  const boxY = height / 2 - boxHeight / 2;

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
