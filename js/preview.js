import { getHex, isDualColor } from "./utils.js";

const letter = {};

export default function (props) {
  const body = document.body;
  const objectSvg = document.getElementById("letter");
  console.log(objectSvg);

  objectSvg.onload = () => {
    const letterDoc = objectSvg.getSVGDocument();

    letter.face = letterDoc.getElementById("face");
    letter.side = letterDoc.getElementById("side");
    letter.light = letterDoc.getElementById("light");

    const isFaceLight = props.faceLight.isOn;
    const faceColor = props.faceColor.color;

    changeLetterColor("face", faceColor, isFaceLight);

    const isSideLight = props.sideLight.isOn;
    const sideColor = props.sideColor.color;
    const sideRgb = isDualColor(sideColor)
      ? sideColor.rgb[+isSideLight]
      : sideColor.rgb;

    changeLetterColor("side", sideColor, isSideLight);

    // changeLightColor(getHex(rgb));
  };
}

export function changeLetterColor(elemName, color, isLight) {
  // const isLight = props[elemName + "Light"].isOn;
  const rgb = isDualColor(color) ? color.rgb[+isLight] : color.rgb;

  letter[elemName].style.fill = "#" + getHex(rgb);
}
