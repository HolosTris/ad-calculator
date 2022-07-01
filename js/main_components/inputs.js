import { switchWindow } from "../script.js";
import { getNameFont, getTextSize, stylizeTextElem } from "../utils.js";

const body = document.body;

function initInputs(props) {
  const inputs = body.getElementsByTagName("input");
  const textSignElem = document.getElementById("text-sign");

  textSignElem.value = props.textSign;

  let numRows = 0;

  stylizeTextElem(textSignElem, props.font.values, props);

  const extendTextSign = () => {
    textSignElem.labels[0].style.display = "none";
    textSignElem.parentElement.classList.add("extended-con");
  };

  if (textSignElem.value) extendTextSign();
  textSignElem.oninput = extendTextSign;

  const invisibleSpan = document.getElementById("invisible-span");

  invisibleSpan.style.position = "fixed";
  invisibleSpan.style.visibility = "hidden";
  // invisibleSpan.style.lineHeight = "auto";

  textSignElem.addEventListener("input", () => {
    let value = textSignElem.value;

    textSignElem.style.height = textSignElem.style.minHeight;

    const lineHeight = parseInt(getComputedStyle(textSignElem).lineHeight);
    const textHeight = textSignElem.scrollHeight;

    numRows = textHeight / lineHeight;

    textSignElem.style.height = lineHeight * numRows + "px";

    props.textSign = value;

    invisibleSpan.style.fontSize = getComputedStyle(textSignElem).fontSize;
    // invisibleSpan.style.maxWidth = getComputedStyle(textSignElem).width;
    stylizeTextElem(invisibleSpan, props.font.values, props);

    invisibleSpan.textContent = value;

    updateSignParams();
  });

  for (let prop in props) {
    const inp = inputs.namedItem(prop);

    if (!inp) continue;

    if (inp.name === "font") {
      const font = props.fonts.find((el) => props.font.id === el.id);

      if (!document.querySelector(`link[href='${font.path}']`))
        document.head.insertAdjacentHTML(
          "beforeend",
          `<link rel="stylesheet" href="${font.path}" />`
        );

      inp.style.fontFamily = font.family;
      inp.style.fontWeight = font.weight;
      inp.style.fontStyle = props.font.isItalic ? "italic" : "normal";

      inp.value = getNameFont(font);

      inp.onclick = () => {
        switchWindow("fontPicker");
      };
    } else {
      const multiplier = inp.dataset.multiplier;

      inp.value = multiplier ? props[prop] * multiplier : props[prop];

      inp.onchange = () => {
        let value = +inp.value;

        value =
          inp.name === "textHeight"
            ? parseInt(value)
            : parseInt(value * 10) / 10;

        value /= multiplier ? multiplier : 1;

        value ? (props[prop] = value) : (value = props[prop]);

        inp.value = multiplier ? props[prop] * multiplier : props[prop];

        updateReadability();
        updateSignParams();
      };
    }
  }

  updateReadability();
  updateSignParams();

  function updateReadability() {
    const distElem = body.getElementsByClassName("param-distance")[0];
    const valueElems = distElem.getElementsByClassName("highlight-text");

    const metersReadability = Math.sqrt(
      Math.pow(props.textHeight * 38.571, 2) -
        Math.pow(props.mountHeight - 1.65, 2)
    );

    valueElems[0].textContent = metersReadability
      ? Math.floor(metersReadability)
      : "0";
    valueElems[1].textContent = metersReadability
      ? Math.floor(metersReadability / 0.71)
      : "0";
  }

  function updateSignParams() {
    updateSignHeight();
    updateSignWidth();
  }

  function updateSignHeight() {
    const elem = inputs.namedItem("signHeight");

    const height =
      getTextSize(
        textSignElem.value,
        `${props.textHeight * 1000}px ${props.font.values.family}`
      ).actualHeight / 1000;

    elem.value = Number.isInteger(height) ? height : height.toFixed(2);
  }

  function updateSignWidth() {
    const elem = inputs.namedItem("signWidth");

    const signFontSizePx = parseInt(getComputedStyle(textSignElem).fontSize);
    const signWidthPx = parseInt(getComputedStyle(invisibleSpan).width);

    console.log(getComputedStyle(invisibleSpan).width);

    const width = (props.textHeight / signFontSizePx) * signWidthPx;

    elem.value = Number.isInteger(width) ? width : width.toFixed(2);
  }
}

// function calculateHeightSign(textHeight, textLength) {
//   return textHeight * textLength;
// }

// function calculateWidthSign() {
//   return textHeight * 0.666 * textLength;
// }

export default initInputs;
