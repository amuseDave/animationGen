export default function getPositionStyles(position) {
  const styles = {
    cc: {
      translateX: -50,
      translateY: -50,
      left: `50%`,
      top: `50%`,
    },
    ct: {
      translateX: -50,
      translateY: -100,
      left: `50%`,
      top: `50%`,
    },
    cb: {
      translateX: -50,
      translateY: 0,
      left: `50%`,
      top: `50%`,
    },
    cl: {
      translateX: -100,
      translateY: -50,
      left: `50%`,
      top: `50%`,
    },
    cr: {
      translateX: 0,
      translateY: -50,
      left: `50%`,
      top: `50%`,
    },
    lc: {
      translateX: 0,
      translateY: -50,
      left: `0%`,
      top: `50%`,
    },
    lco: {
      translateX: -100,
      translateY: -50,
      left: `0%`,
      top: `50%`,
    },
    rc: {
      translateX: 0,
      translateY: -50,
      right: `0%`,
      top: `50%`,
    },
    rco: {
      translateX: 100,
      translateY: -50,
      right: `0%`,
      top: `50%`,
    },
    tc: {
      translateX: -50,
      translateY: 0,
      left: `50%`,
      top: `0%`,
    },
    tco: {
      translateX: -50,
      translateY: -100,
      left: `50%`,
      top: `0%`,
    },
    bc: {
      translateX: -50,
      translateY: 0,
      left: `50%`,
      bottom: `0%`,
    },
    bco: {
      translateX: -50,
      translateY: 100,
      left: `50%`,
      bottom: `0%`,
    },
    tl: {
      translateX: 0,
      translateY: 0,
      left: `0%`,
      top: `0%`,
    },
    tr: {
      translateX: 0,
      translateY: 0,
      right: `0%`,
      top: `0%`,
    },
    tlot: {
      translateX: 0,
      translateY: -100,
      left: `0%`,
      top: `0%`,
    },
    trot: {
      translateX: 0,
      translateY: -100,
      right: `0%`,
      top: `0%`,
    },
    tlol: {
      translateX: -100,
      translateY: 0,
      left: `0%`,
      top: `0%`,
    },
    tror: {
      translateX: 100,
      translateY: 0,
      right: `0%`,
      top: `0%`,
    },
    bl: {
      translateX: 0,
      translateY: 0,
      left: `0%`,
      bottom: `0%`,
    },
    br: {
      translateX: 0,
      translateY: 0,
      right: `0%`,
      bottom: `0%`,
    },
    blob: {
      translateX: 0,
      translateY: 100,
      left: `0%`,
      bottom: `0%`,
    },
    brob: {
      translateX: 0,
      translateY: 100,
      right: `0%`,
      bottom: `0%`,
    },
    blol: {
      translateX: -100,
      translateY: 0,
      left: `0%`,
      bottom: `0%`,
    },
    bror: {
      translateX: 100,
      translateY: 0,
      right: `0%`,
      bottom: `0%`,
    },
  };

  return styles[position];
}
