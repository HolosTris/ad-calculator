import { switchWindow } from "../script.js";
import { getNameFont, stylizeTextElem } from "../utils.js";

const body = document.body;

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

      stylizeTextElem(textSignElem, font, props);

      const extendTextSign = () => {
        textSignElem.labels[0].style.display = "none";
        textSignElem.parentElement.classList.add("extended-con");
      };

      if (textSignElem.value) extendTextSign();
      textSignElem.oninput = extendTextSign;

      inp.value = getNameFont(font);

      inp.onclick = () => {
        switchWindow("fontPicker");
      };
    } else {
      const multiplier = inp.dataset.multiplier;

      inp.value = multiplier ? props[prop] * multiplier : props[prop];

      inp.onchange = () => {
        let value = +inp.value;

        value /= multiplier ? multiplier : 1;
        props[prop] = value;

        inp.value = multiplier ? props[prop] * multiplier : props[prop];

        updateReadability();
      };
    }

    // {
    //   inp.value = props[prop];

    //   inp.onchange = () => {
    //     let value = inp.value;

    //     props[prop] = value;
    //   };
    // }
  }

  updateReadability();

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
}

export default initInputs;
