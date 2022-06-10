import initColors from "./colors.js";
import initMain from "./main.js";

const body = document.body;
const props = {
  textSign: "",
  font: 1,
  textHeight: 10,
  signHeight: 1,
  signWidth: 1,
  mountHeight: 1,
  faceColor: "641-21",
  faceLight: 1,
  isFaceLight: true,
  sideColor: "8500-25",
  sideLight: 1,
  isSideLight: false,
  backLight: 6,
  isBackLight: true,
  isHighBrightness: false,
  windows: {},
  palettes: {},
};

initApp();

async function initApp() {
  await fetchWindow("main");
  props.windows.main.script = initMain;

  await fetchWindow("colors");
  props.windows.colors.script = initColors;

  await fetchPalette("palette641");
  await fetchPalette("palette8500");

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
  // Colors();
}

// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
