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

export function handleTranslateInputs(val) {
  if (val.includes(".")) return;
  if (val.endsWith("-") && val.length > 1) {
    val = `-${val.slice(0, val.length - 1)}`;
  }
  if (val.startsWith("-") && val.endsWith("+") && val.length > 2) {
    val = val.slice(1, val.length - 1);
  }

  if (val === "-" || val === "") val = "0";
  if (val.startsWith("0") && val.length > 1) val = val.slice(1);
  if (val.startsWith("-0") && val.length > 2) val = `-${val.slice(2)}`;

  if (Math.abs(val) > 400) val = val > 0 ? 400 : -400;

  return val;
}
export function handleValueInputs(value) {
  if (value === "." || value === "") value = "0";
  if (value.startsWith("0") && value.length > 1 && !value.startsWith("0."))
    value = value.slice(1);
  if (value > 5) value = "5";
  if (value === "5.") value = "5";
  if (value < 0) value = "0";

  return value;
}

export function handleOutsideXYCalc(val) {
  return val + 100 + 15 >= 200 ? 200 - 15 : val + 95 <= 0 ? 0 + 5 : val + 100;
}

export function getOffsetXY(e) {
  const element = e.currentTarget; // The element the event is bound to

  const rect = element.getBoundingClientRect();

  // Calculate offsets
  const offsetX = (e.clientX || e.touches?.[0]?.clientX || 0) - rect.left;
  const offsetY = (e.clientY || e.touches?.[0]?.clientY || 0) - rect.top;

  return { offsetX, offsetY };
}

function isValidKeyFrame(keyFrame) {
  const allowedKeys = [
    "keyPercentage",
    "position",
    "oldPos",
    "color",
    "opacity",
    "scale",
    "translateX",
    "translateY",
    "rotate",
    "left",
    "top",
  ];

  keyFrame.oldPos = keyFrame.position;

  // Check that all keys in the object are valid
  const hasValidKeys = Object.keys(keyFrame).every((key) => {
    return allowedKeys.includes(key);
  });

  return (
    hasValidKeys &&
    typeof keyFrame.keyPercentage === "number" &&
    typeof keyFrame.position === "string" &&
    typeof keyFrame.oldPos === "string" &&
    typeof keyFrame.color === "string" &&
    typeof keyFrame.opacity === "number" &&
    typeof keyFrame.scale === "number" &&
    typeof keyFrame.translateX === "number" &&
    typeof keyFrame.translateY === "number" &&
    typeof keyFrame.rotate === "number" &&
    typeof keyFrame.left === "string" &&
    typeof keyFrame.top === "string"
  );
}

export function validateAnimationObject(obj) {
  const allowedKeys = [
    "animationFunction",
    "isValidKeyFrame",
    "duration",
    "activeKeyFrame",
    "keyFramePers",
    "keyFrames",
    "isDragDrop",
  ];

  // Check that all keys in the animation object are valid
  const hasValidKeys = Object.keys(obj).every((key) => {
    return allowedKeys.includes(key);
  });

  return (
    hasValidKeys &&
    obj &&
    typeof obj.animationFunction === "string" &&
    (obj.isValidKeyFrame === null ||
      typeof obj.isValidKeyFrame === "boolean" ||
      typeof obj.isValidKeyFrame === "string" ||
      typeof obj.isValidKeyFrame === "number") &&
    typeof obj.isDragDrop === "boolean" &&
    typeof obj.duration === "number" &&
    typeof obj.activeKeyFrame === "number" &&
    Array.isArray(obj.keyFramePers) &&
    Array.isArray(obj.keyFrames) &&
    obj.keyFrames.every((kf, index) => {
      return (
        isValidKeyFrame(kf) && obj.keyFramePers[index] === kf.keyPercentage
      );
    }) &&
    obj.keyFrames.length === obj.keyFramePers.length
  );
}

export function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
