export default function getPositionStyles(position) {
  const styles = {
    cc: {
      translateX: -50,
      translateY: -50,
      left: "50%",
      top: "50%",
    },
    ct: {
      translateX: -50,
      translateY: -100,
      left: "50%",
      top: "50%",
    },
    cb: {
      translateX: -50,
      translateY: 0,
      left: "50%",
      top: "50%",
    },
    cl: {
      translateX: -100,
      translateY: -50,
      left: "50%",
      top: "50%",
    },
    cr: {
      translateX: 0,
      translateY: -50,
      left: "50%",
      top: "50%",
    },
    lc: {
      translateX: 0,
      translateY: -50,
      left: "0%",
      top: "50%",
    },
    lco: {
      translateX: -100,
      translateY: -50,
      left: "0%",
      top: "50%",
    },
    rc: {
      translateX: -100,
      translateY: -50,
      left: "100%",
      top: "50%",
    },
    rco: {
      translateX: 0,
      translateY: -50,
      left: "100%",
      top: "50%",
    },
    tc: {
      translateX: -50,
      translateY: 0,
      left: "50%",
      top: "0%",
    },
    tco: {
      translateX: -50,
      translateY: -100,
      left: "50%",
      top: "0%",
    },
    bc: {
      translateX: -50,
      translateY: -100,
      left: "50%",
      top: "100%",
    },
    bco: {
      translateX: -50,
      translateY: 0,
      left: "50%",
      top: "100%",
    },
    tl: {
      translateX: 0,
      translateY: 0,
      left: "0%",
      top: "0%",
    },
    tr: {
      translateX: -100,
      translateY: 0,
      left: "100%",
      top: "0%",
    },
    tlot: {
      translateX: 0,
      translateY: -100,
      left: "0%",
      top: "0%",
    },
    trot: {
      translateX: -100,
      translateY: -100,
      left: "100%",
      top: "0%",
    },
    tlol: {
      translateX: -100,
      translateY: 0,
      left: "0%",
      top: "0%",
    },
    tror: {
      translateX: 0,
      translateY: 0,
      left: "100%",
      top: "0%",
    },
    bl: {
      translateX: 0,
      translateY: -100,
      left: "0%",
      top: "100%",
    },
    br: {
      translateX: -100,
      translateY: -100,
      left: "100%",
      top: "100%",
    },
    blob: {
      translateX: 0,
      translateY: 0,
      left: "0%",
      top: "100%",
    },
    brob: {
      translateX: -100,
      translateY: 0,
      left: "100%",
      top: "100%",
    },
    blol: {
      translateX: -100,
      translateY: -100,
      left: "0%",
      top: "100%",
    },
    bror: {
      translateX: 0,
      translateY: -100,
      left: "100%",
      top: "100%",
    },
  };

  return styles[position];
}

export function stringifyStyles({ pos, oldPos, keyPercentage, ...rest }) {
  return JSON.stringify({ ...rest });
}
