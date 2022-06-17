import { switchWindow } from "./script.js";
import { isDualColor, getHex, setContrastText, isBright } from "./utils.js";

export default function (props, choosingPropName = "faceLight") {
  const body = document.body;
  body.setAttribute("choosing", choosingPropName);

  const colorsList = document.getElementsByClassName("light-colors-list")[0];

  const palette = props.palettes.lightColors;

  fillList(palette.colors);

  function fillList(palette) {
    colorsList.innerHTML = "";

    const btns = [];

    for (let color of palette) btns.push(createBtn(color, color.rgb));

    colorsList.append(...btns);
  }

  function createBtn(color, rgb) {
    const choosingProp = props[choosingPropName];
    const isPicked = choosingProp.color.id === color.id;

    const hex = color.rgb ? getHex(rgb) : null;

    const btn = document.createElement("div");

    btn.className = `color-con`;

    btn.innerHTML = `
      <div class="btn info-color" style="background-color:${
        hex ? "#" + hex : "none"
      }">
      <div class="intersections-img ${isBright(rgb) ? "inverted" : ""}"></div>
      <span class="${setContrastText(rgb)}">${
      color.name + (color.name === "RGB" ? " (меняет цвет)" : "")
    }</span>
      </div>
      <div class="pick-indicator btn ${isPicked ? "active" : ""}">
      <div class="light-img"></div>
      </div>`;

    btn.onclick = (ev) => {
      choosingProp.id = color.id;
      choosingProp.color = color;
      choosingProp.isOn = true;

      switchWindow("main");
    };

    return btn;
  }
}
