import { switchWindow } from "./script.js";
import { isDualColor, getHex, setContrastText, isBright } from "./utils.js";

export default function (props) {
  const body = document.body;

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
    const hex = color.rgb ? getHex(rgb) : null;

    const btn = document.createElement("div");

    btn.className = `btn font-con black-text`;

    btn.innerHTML = `
    <span></span>
    <div class="pick-indicator btn">
      <span></span>
    </div>`;

    btn.onclick = (ev) => {
      // choosingProp.id = color.id;
      // choosingProp.color = color;
      // choosingProp.isOn = true;

      switchWindow("main");
    };

    return btn;
  }
}
