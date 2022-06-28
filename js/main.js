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

    // const textSignElem = document.getElementById("text-sign");
    // const focusTextSign = (ev) => {
    //   textSignElem.focus();

    //   body.removeEventListener("pointerup", focusTextSign);
    // };
    // body.addEventListener("pointerup", focusTextSign);

    randomizeProps(props);

    body.removeEventListener("pointerdown", hideWelcome);

    props.isWelcomed = true;

    switchWindow("main");
  };

  body.addEventListener("pointerdown", hideWelcome);
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
  for (let propName of lightPropNames) {
    const color =
      props.palettes.lightColors.colors[
        Math.floor(Math.random() * props.palettes.lightColors.colors.length)
      ];
    props[propName].id = color.id;
    props[propName].color = color;
    props[propName].isOn = Math.round(Math.random());
  }

  props.isHighBrightness = Math.round(Math.random());

  // textSign: "",
  // font: { id: 1, values: undefined, isItalic: false },
  // textHeight: 0.3,
  // signHeight: 0,
  // signWidth: 0,
  // mountHeight: 4,
  // faceColor: { id: "641-0", color: null, palette: null },
  // faceLight: { id: 1, color: null, isOn: false },
  // sideColor: { id: "641-0", color: null, palette: null },
  // sideLight: { id: 1, color: null, isOn: false },
  // backLight: { id: 1, color: null, isOn: true },
  // isHighBrightness: false,
  // windows: {},
  // palettes: {},
  // fonts: [],
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
