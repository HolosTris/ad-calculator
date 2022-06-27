import { switchWindow } from "./script.js";
import initPreview from "./preview.js";
import initPropButtons from "./main_components/prop_buttons.js";
import initModal from "./main_components/modal.js";
import { getHex, getNameFont, isBright, stylizeTextElem } from "./utils.js";
import initHeader from "./header.js";
import initInputs from "./main_components/inputs.js";

const body = document.body;

function initMain(props) {
  const objectSvg = document.getElementById("letter");

  initHeader();
  initInputs(props);
  initPropButtons(props);
  initModal(props);
  initPreview(objectSvg, props);
  initActionButtons(props);
  props.isWelcomed ? null : initWelcome(props);
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
    timestamp: Date.now(),
  };

  const orders = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [];

  const jsonSign = JSON.stringify(sign, (key, value) => {
    return key === "palette" || key === "color" || key === "values"
      ? undefined
      : value;
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
