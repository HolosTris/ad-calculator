import initPicker from "./picker.js";
import initMain from "./main.js";
import initLightPicker from "./light_picker.js";
import initFontPicker from "./font_picker.js";
import { toCamelCase } from "./utils.js";

const body = document.body;
const props = {
  textSign: "",
  font: { id: 1, isItalic: false },
  textHeight: 10,
  signHeight: 1,
  signWidth: 1,
  mountHeight: 1,
  faceColor: { id: "641-0", color: null, palette: null },
  faceLight: { color: 1, isOn: false },
  sideColor: { id: "641-0", color: null, palette: null },
  sideLight: { color: 1, isOn: false },
  backLight: { color: 1, isOn: true },
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

  await fetchWindow("main");
  props.windows.main.script = initMain;

  await fetchWindow("picker");
  props.windows.picker.script = initPicker;

  await fetchWindow("light_picker");
  props.windows.lightPicker.script = initLightPicker;

  await fetchWindow("font_picker");
  props.windows.fontPicker.script = initFontPicker;

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

function initColors(colorProps = []) {
  colorProps.forEach((colProp) => {
    if (colProp.isOn === undefined) initStaticColor(colProp);
    else initLightColor(colProp);
  });
}

function initStaticColor(colorProp) {
  const palId = colorProp.id.slice(0, colorProp.id.indexOf("-"));
  colorProp.palette = props.palettes["palette" + palId];
  colorProp.color = colorProp.palette.colors.find((color) =>
    palId + "-" + color.id == colorProp.id ? 1 : 0
  );
}

function initLightColor(colorProp) {
  colorProp.color = props.palettes.lightColors.colors.find((color) =>
    color.id == colorProp.color ? 1 : 0
  );
}

// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
