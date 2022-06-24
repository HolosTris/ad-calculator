import { switchWindow } from "./script.js";
import initPreview from "./main_components/preview.js";
import initPropButtons from "./main_components/prop_buttons.js";
import initModal from "./main_components/modal.js";
import { getHex, isBright } from "./utils.js";
import initHeader from "./header.js";

const body = document.body;

function initMain(props) {
  initHeader();
  initInputs(props);
  initPropButtons(props);
  initModal(props);
  initPreview(props);
  initActionButtons(props);
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

      const textRgb = props.faceColor.color.rgb;
      if (textRgb) {
        textSignElem.style.color = "#" + getHex(textRgb);
        textSignElem.style.textShadow = isBright(textRgb)
          ? "none"
          : "-0.5px 0 #fff, 0 0.5px #fff, 0.5px 0 #fff, 0 -0.5px #fff";
      }

      const extendTextSign = () => {
        textSignElem.labels[0].style.display = "none";
        textSignElem.parentElement.classList.add("extended-con");
      };

      if (textSignElem.value) extendTextSign();
      textSignElem.oninput = extendTextSign;

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
      const multiplier = inp.dataset.multiplier;

      inp.value = multiplier ? props[prop] * multiplier : props[prop];

      console.log(inp.dataset.multiplier);

      inp.onchange = () => {
        let value = inp.classList.contains("inp-number")
          ? +inp.value
          : inp.value;

        value /= multiplier ? multiplier : 1;
        props[prop] = value;

        inp.value = multiplier ? props[prop] * multiplier : props[prop];
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

    const textSignElem = document.getElementById("text-sign");
    const focusTextSign = (ev) => {
      textSignElem.focus();

      body.removeEventListener("pointerup", focusTextSign);
    };
    body.addEventListener("pointerup", focusTextSign);

    body.removeEventListener("pointerdown", hideWelcome);
  };

  body.addEventListener("pointerdown", hideWelcome);

  props.isWelcomed = true;
}

function initActionButtons(props) {
  const actionsELem = body.getElementsByClassName("actions")[0];
  const actionBtns = actionsELem.getElementsByTagName("button");

  actionBtns.namedItem("addToBasket").onclick = () => addToBasket(props);
}

function addToBasket(props) {
  const sign = {
    text: props.textSign,
    font: props.font,
    height: props.signHeight,
    width: props.signWidth,
    textHeight: props.textHeight,
    mountHeight: props.mountHeight,
    faceColor: props.faceColor,
    faceLight: props.faceLight,
    sideColor: props.sideColor,
    sideLight: props.sideLight,
    backLight: props.backLight,
    isHighBrightness: props.isHighBrightness,
  };

  const orders = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [];

  const jsonSign = JSON.stringify(sign, (key, value) => {
    return key === "palette" || key === "color" ? undefined : value;
  });
  const isAlreadyHad = orders.find((order) => {
    console.log(order);
    console.log(sign);
    return jsonSign === JSON.stringify(order);
  });
  const newOrder = JSON.parse(jsonSign);

  if (!isAlreadyHad) orders.push(newOrder);

  const jsonOrders = JSON.stringify(orders);

  localStorage.setItem("orders", jsonOrders);
  console.log(localStorage.getItem("orders"));
}

export default initMain;
