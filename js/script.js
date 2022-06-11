import initPicker from "./picker.js";
import initMain from "./main.js";

const body = document.body;
const props = {
  textSign: "",
  font: 1,
  textHeight: 10,
  signHeight: 1,
  signWidth: 1,
  mountHeight: 1,
  faceColor: { id: "641-34", color: null, palette: null },
  faceLight: { color: 1, isOn: false },
  sideColor: { id: "8500-8", color: null, palette: null },
  sideLight: { color: 1, isOn: false },
  backLight: { color: 6, isOn: true },
  isHighBrightness: false,
  windows: {},
  palettes: {},
};

initApp();

async function initApp() {
  await fetchPalette("palette641");
  await fetchPalette("palette8500");

  initColors([props.faceColor, props.sideColor]);

  await fetchWindow("main");
  props.windows.main.script = initMain;

  await fetchWindow("picker");
  props.windows.picker.script = initPicker;

  switchWindow("main");
}

async function fetchWindow(name) {
  const template = document.createElement("template");

  template.innerHTML = await fetch("./windows/" + name + ".html").then(
    (response) => response.text()
  );
  props.windows[name] = {};
  props.windows[name].body = template.content;
}

async function fetchPalette(name) {
  return await fetch("./json/" + name + ".json")
    .then((res) => res.json())
    .catch((error) => alert(error))
    .then((palette) => {
      props.palettes[name] = palette;
    });
}

function switchWindow(name) {
  body.classList = [];
  body.innerHTML = "";

  body.classList.add("window-" + name);

  body.append(props.windows[name].body);

  if (props.windows[name].script) props.windows[name].script(props);
}

function initColors(colors = []) {
  colors.forEach((col) => {
    const palId = col.id.slice(0, col.id.indexOf("-"));
    col.palette = props.palettes["palette" + palId];
    col.color = col.palette.colors.find((color) =>
      palId + "-" + color.id == col.id ? 1 : 0
    );
  });
}

// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
