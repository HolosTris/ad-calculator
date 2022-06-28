import { getHex, isDualColor } from "./utils.js";

const letter = {};

function initPreview(objectSvg, props) {
  const body = document.body;

  objectSvg.onload = () => {
    const letterDoc = objectSvg.getSVGDocument();

    letter.face = letterDoc.getElementById("face");
    letter.side = letterDoc.getElementById("side");
    letter.faceLight = letterDoc.getElementById("faceLight");
    letter.sideLight = letterDoc.getElementById("sideLight");
    letter.backLight = letterDoc.getElementById("backLight");
    letter.shadows = [
      letterDoc.getElementById("shadow"),
      letterDoc.getElementById("shadowStripes"),
    ];

    const isFaceLight = props.faceLight.isOn;
    const faceLightColor = props.faceLight.color;
    const faceColor = props.faceColor.color;

    changeLetterColor("face", faceColor, isFaceLight);

    const isSideLight = props.sideLight.isOn;
    const sideLightColor = props.sideLight.color;
    const sideColor = props.sideColor.color;

    changeLetterColor("side", sideColor, isSideLight);

    const isBackLight = props.backLight.isOn;
    const backLightColor = props.backLight.color;

    const isBright = props.isHighBrightness;

    toggleLight("faceLight", faceLightColor, isFaceLight, isBright);
    toggleLight("sideLight", sideLightColor, isSideLight, isBright);

    toggleLight("backLight", backLightColor, isBackLight, isBright);
  };
}

export function changeLetterColor(elemName, color, isLight = false) {
  const rgb = color.rgb
    ? isDualColor(color)
      ? color.rgb[+isLight]
      : color.rgb
    : null;

  letter[elemName].style.fill = rgb ? "#" + getHex(rgb) : "#fff";
}

let animationsRGB = {};

export function toggleLight(elemName, color, isLight = false, isBright) {
  const rgb = color.rgb;

  if (color.name === "RGB" && !rgb && isLight)
    elemName === "backLight"
      ? (animationsRGB[elemName] = animateRGB(elemName, 0.5))
      : (animationsRGB[elemName] = animateRGB(elemName, 0.2));
  else animationsRGB[elemName] ? animationsRGB[elemName].cancel() : "";

  letter[elemName].style.fill =
    isLight && rgb
      ? elemName === "backLight"
        ? `rgba(${rgb}, ${0.5 * (isBright + 1)})`
        : `rgba(${rgb}, ${0.15 * (isBright + 1)})`
      : "transparent";

  if (elemName === "sideLight")
    letter.shadows[1].style.opacity = isLight ? 0 : 0.3;
  // isLight
  //   ? letter.shadows.forEach((elem) => (elem.style.opacity = 0))
  //   : letter.shadows.forEach((elem) => (elem.style.opacity = 0.3));
}

function animateRGB(elemName, opacity = 1) {
  return letter[elemName].animate(
    [
      { fill: "hsl(0, 100%, 50%," + opacity + " )" },
      { fill: "hsl(120, 100%, 50%," + opacity + " )" },
      { fill: "hsl(240, 100%, 50%," + opacity + " )" },
      { fill: "hsl(360, 100%, 50%," + opacity + " )" },
    ],
    {
      id: elemName,
      duration: 10000,
      iterations: Infinity,
    }
  );
}

export default initPreview;
