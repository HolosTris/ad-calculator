import { switchWindow } from "./script.js";
import initPreview from "./preview.js";
import initPropButtons from "./main_components/prop_buttons.js";
// import initModal from "./main_components/modal.js";
// import { getHex, getNameFont, isBright, stylizeTextElem } from "./utils.js";
import initHeader from "./header.js";
import initInputs from "./main_components/inputs.js";
import { validate } from "./utils.js";

const body = document.body;

function initMain(props) {
  const objectSvg = document.getElementById("letter");

  initHeader();
  initInputs(props);
  initPropButtons(props);
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

  const hideWelcome = (ev) => {
    ev.preventDefault();

    paramsElems.forEach((el) => (el.style.display = "block"));
    titleElem.style.display = "block";
    welcomeElem.style.display = "none";

    randomizeProps(props);

    body.removeEventListener("pointerup", hideWelcome);
    body.removeEventListener("pointermove", hideWelcome);

    props.isWelcomed = true;

    setTimeout(() => {
      switchWindow("main");
      document.getElementById("text-sign").focus();
    }, 0);
  };

  body.addEventListener("pointerup", hideWelcome);
  body.addEventListener("pointermove", hideWelcome);
}

function initActionButtons(props) {
  const actionsELem = body.getElementsByClassName("actions")[0];
  const actionBtns = actionsELem.getElementsByTagName("button");

  actionBtns.namedItem("addToBasket").onclick = () => addToBasket(props);
}

function randomizeProps(props) {
  const colorPropNames = ["faceColor", "sideColor"];
  for (let propName of colorPropNames) {
    const paletteName = Math.round(Math.random())
      ? "palette641"
      : "palette8500";
    const color =
      props.palettes[paletteName].colors[
        Math.floor(Math.random() * props.palettes[paletteName].colors.length)
      ];
    props[propName].id = paletteName.replace("palette", "") + "-" + color.id;
    props[propName].color = color;
    props[propName].palette = props.palettes[paletteName];
  }

  const lightPropNames = ["faceLight", "sideLight", "backLight"];
  const colors = [
    props.palettes.lightColors.colors[
      Math.floor(Math.random() * props.palettes.lightColors.colors.length)
    ],
    props.palettes.lightColors.colors[
      Math.floor(Math.random() * props.palettes.lightColors.colors.length)
    ],
  ];

  for (let propName of lightPropNames) {
    const numColor = propName !== "backLight" ? 0 : 1;
    console.log(colors[numColor]);
    props[propName].id = colors[numColor].id;
    props[propName].color = colors[numColor];
    props[propName].isOn = Math.round(Math.random());
  }

  props.isHighBrightness = Math.round(Math.random());
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
    filmType: props.filmType,
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

  // Простая валидация
  if (!validateOrder(newOrder)) {
    const thisBtn = document.getElementsByName("addToBasket")[0];

    thisBtn.style.borderColor = "red";
    setTimeout(() => (thisBtn.style.borderColor = null), 3000);

    return;
  }

  if (!isAlreadyHad) orders.push(newOrder);

  const jsonOrders = JSON.stringify(orders);

  localStorage.setItem("orders", jsonOrders);
  console.log(localStorage.getItem("orders"));
}

function validateOrder(order) {
  console.log(order);
  for (let propName in order) {
    if (order[propName] === null || order[propName] === "") return false;
  }
}

export default initMain;
