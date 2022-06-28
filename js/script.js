import initPicker from "./picker.js";
import initMain from "./main.js";
import initLightPicker from "./light_picker.js";
import initFontPicker from "./font_picker.js";
import { toCamelCase } from "./utils.js";
import initBasket from "./basket.js";

const body = document.body;
const props = {
  textSign: "",
  font: { id: 1, values: undefined, isItalic: false },
  textHeight: 0.3,
  signHeight: 0,
  signWidth: 0,
  mountHeight: 4,
  faceColor: { id: "641-0", color: null, palette: null },
  faceLight: { id: 1, color: null, isOn: false },
  sideColor: { id: "641-0", color: null, palette: null },
  sideLight: { id: 1, color: null, isOn: false },
  backLight: { id: 1, color: null, isOn: true },
  isHighBrightness: false,
  windows: {},
  palettes: {},
  fonts: [],
  isWelcomed: false,
};

initApp();

async function initApp() {
  await fetchPalette("palette641");
  await fetchPalette("palette8500");
  await fetchPalette("light_colors");

  await fetchFonts();

  initColors([
    props.faceColor,
    props.sideColor,
    props.faceLight,
    props.sideLight,
    props.backLight,
  ]);
  initFont(props.font);

  await fetchWindow("main");
  props.windows.main.script = initMain;

  await fetchWindow("picker");
  props.windows.picker.script = initPicker;

  await fetchWindow("light_picker");
  props.windows.lightPicker.script = initLightPicker;

  await fetchWindow("font_picker");
  props.windows.fontPicker.script = initFontPicker;

  await fetchWindow("basket");
  props.windows.basket.script = initBasket;

  switchWindow("main");
}

async function fetchWindow(name = "") {
  const template = document.createElement("template");

  template.innerHTML = await fetch("./windows/" + name + ".html").then(
    (response) => response.text()
  );
  console.log(template);

  const camelCaseName = toCamelCase(name, "_");

  props.windows[camelCaseName] = {};
  props.windows[camelCaseName].body = template.content;
}

async function fetchPalette(name) {
  return await fetch("./json/" + name + ".json")
    .then((res) => res.json())
    .catch((error) => alert(error))
    .then((palette) => {
      props.palettes[toCamelCase(name)] = palette;
    });
}

async function fetchFonts() {
  return await fetch("./json/fonts.json")
    .then((res) => res.json())
    .catch((error) => alert(error))
    .then((fonts) => {
      props.fonts = fonts;
    });
}

export function switchWindow(name, params = []) {
  body.classList = [];
  body.innerHTML = "";

  body.classList.add("window-" + name);

  const window = props.windows[name].body.cloneNode(true);

  scrollTo(0, 0);
  body.append(window);

  if (props.windows[name].script) props.windows[name].script(props, ...params);
}

export function initColors(colorProps = []) {
  colorProps.forEach((colProp) => {
    initColor(colProp);
  });
}

export function initColor(colorProp) {
  if (colorProp.isOn === undefined) return initStaticColor(colorProp);
  else return initLightColor(colorProp);
}

function initStaticColor(colorProp) {
  const palId = colorProp.id.slice(0, colorProp.id.indexOf("-"));
  colorProp.palette = props.palettes["palette" + palId];
  colorProp.color = colorProp.palette.colors.find((color) =>
    palId + "-" + color.id == colorProp.id ? 1 : 0
  );

  return colorProp;
}

function initLightColor(colorProp) {
  colorProp.color = props.palettes.lightColors.colors.find((color) =>
    color.id == colorProp.id ? 1 : 0
  );

  return colorProp;
}

export function initFont(font) {
  font.values = props.fonts.find((el) => font.id === el.id);
}

// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
