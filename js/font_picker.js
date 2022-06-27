import { switchWindow } from "./script.js";
import { isDualColor, getHex, setContrastText, isBright } from "./utils.js";

export default function (props) {
  const body = document.body;

  const curFont = props.font;

  let isItalic = curFont.isItalic;
  initToggleBtn();

  const fontsList = document.getElementsByClassName("fonts-list")[0];

  const fonts = props.fonts;

  fillList(fonts);

  function fillList(fonts) {
    fontsList.innerHTML = "";

    const btns = [];

    for (let font of fonts) btns.push(createBtn(font));

    fontsList.append(...btns);
  }

  function createBtn(font) {
    const isPicked = curFont.id === font.id;

    const btn = document.createElement("div");

    btn.className = `btn font-con black-text`;
    // url(../svg/fonts/path640.svg)
    btn.innerHTML = `
    <div class="text-svg" style="background-image:url(./svg/fonts${
      isItalic
        ? "/italic/path" + (8808 + font.id * 2)
        : "/path" + (638 + font.id * 2)
    }.svg)">
    </div>
    <div class="pick-indicator btn ${isPicked ? "active" : ""}">
      <span>${font.id}</span>
    </div>`;

    btn.onclick = (ev) => {
      // choosingProp.id = color.id;
      // choosingProp.color = color;
      // choosingProp.isOn = true;
      curFont.id = font.id;
      curFont.values = font;
      curFont.isItalic = isItalic;

      switchWindow("main");
    };

    return btn;
  }

  function initToggleBtn() {
    const toggleBtn = body.getElementsByClassName("toggle-italic")[0];

    if (isItalic) toggleBtn.classList.add("alter");

    toggleBtn.onclick = () => {
      isItalic = !isItalic;

      toggleBtn.classList.toggle("alter");
      fillList(fonts);
    };
  }
}
