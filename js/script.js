import initPicker from "./picker.js";
import initMain from "./main.js";
import initLightPicker from "./light_picker.js";
import { toCamelCase } from "./utils.js";

const body = document.body;
const props = {
  textSign: "",
  font: 1,
  textHeight: 10,
  signHeight: 1,
  signWidth: 1,
  mountHeight: 1,
  faceColor: { id: "641-34", color: null, palette: null },
  faceLight: { color: 5, isOn: false },
  sideColor: { id: "8500-528", color: null, palette: null },
  sideLight: { color: 4, isOn: false },
  backLight: { color: 7, isOn: true },
  isHighBrightness: false,
  windows: {},
  palettes: {},
};

initApp();

async function initApp() {
  await fetchPalette("palette641");
  await fetchPalette("palette8500");
  await fetchPalette("light_colors");

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

  switchWindow("main");
}

async function fetchWindow(name = "") {
  const template = document.createElement("template");

  template.innerHTML = await fetch("./windows/" + name + ".html").then(
    (response) => response.text()
  );

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

export function switchWindow(name, params = []) {
  body.classList = [];
  body.innerHTML = "";

  body.classList.add("window-" + name);

  const window = props.windows[name].body.cloneNode(true);

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
