import { switchWindow } from "./script.js";
import initPreview from "./preview.js";
import initPropButtons from "./prop_buttons.js";
import initModal from "./modal.js";
import { getHex, isBright } from "./utils.js";

const body = document.body;

export default function (props) {
  initInputs(props);
  initPropButtons(props);
  initModal(props);
  initPreview(props);
  props.isWelcomed ? null : initWelcome(props);
}

function initInputs(props) {
  const inputs = body.getElementsByTagName("input");

  for (let prop in props) {
    const inp = inputs.namedItem(prop);

    if (!inp) continue;

    if (inp.name === "font") {
      const font = props.fonts.find((el) => props.font.id === el.id);
      const textSignElem = inputs.namedItem("textSign");

      if (!document.querySelector(`link[href='${font.path}']`))
        document.head.insertAdjacentHTML(
          "beforeend",
          `<link rel="stylesheet" href="${font.path}" />`
        );

      inp.style.fontFamily = font.family;
      inp.style.fontWeight = font.weight;
      inp.style.fontStyle = props.font.isItalic ? "italic" : "normal";

      textSignElem.style.fontFamily = font.family;
      textSignElem.style.fontWeight = font.weight;
      textSignElem.style.fontStyle = props.font.isItalic ? "italic" : "normal";

      textSignElem.focus();

      const textRgb = props.faceColor.color.rgb;
      if (textRgb) {
        textSignElem.style.color = "#" + getHex(textRgb);
        textSignElem.style.textShadow = isBright(textRgb)
          ? "none"
          : "-0.5px 0 #fff, 0 0.5px #fff, 0.5px 0 #fff, 0 -0.5px #fff";
      }

      if (textSignElem.value) textSignElem.labels[0].style.display = "none";
      textSignElem.oninput = () =>
        (textSignElem.labels[0].style.display = "none");

      const postfix =
        font.weight === "bold" || font.weight > 500
          ? " толстый"
          : font.weight === "normal" || font.weight == 500
          ? ""
          : " тонкий";
      inp.value = font.id + ". " + font.family + postfix;

      inp.onclick = () => {
        switchWindow("fontPicker");
      };
    } else {
      inp.value = props[prop];

      inp.onchange = () => {
        props[prop] = inp.classList.contains("inp-number")
          ? +inp.value
          : inp.value;
        inp.value = props[prop];
      };
    }
  }
}

function initWelcome(props) {
  const paramsElems = [...body.getElementsByClassName("param")];
  const titleElem = body.getElementsByClassName("preview-title")[0];
  const welcomeElem = body.getElementsByClassName("welcome")[0];

  paramsElems.forEach((el) => (el.style.display = "none"));
  titleElem.style.display = "none";
  welcomeElem.style.display = "block";

  const hideWelcome = () => {
    paramsElems.forEach((el) => (el.style.display = "block"));
    titleElem.style.display = "block";
    welcomeElem.style.display = "none";
    body.removeEventListener("pointerdown", hideWelcome);
  };

  body.addEventListener("pointerdown", hideWelcome);

  props.isWelcomed = true;
}
