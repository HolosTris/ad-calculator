import { playScenario, setScenario, switchWindow } from "./script.js";
import { isDualColor, getHex, setContrastText, isBright } from "./utils.js";

export default function (props, choosingPropName = "faceLight") {
  const body = document.body;
  body.setAttribute("choosing", choosingPropName);

  const colorsList = document.getElementsByClassName("light-colors-list")[0];

  const palette = props.palettes.lightColors;

  fillList(palette.colors);

  function fillList(palette) {
    colorsList.innerHTML = "";

    const btns = [];

    for (let color of palette) btns.push(createBtn(color, color.rgb));

    colorsList.append(...btns);
  }

  function createBtn(color, rgb) {
    const choosingProp = props[choosingPropName];
    const isPicked = choosingProp.color.id === color.id;

    const hex = color.rgb ? getHex(rgb) : null;

    const btn = document.createElement("div");

    btn.className = `color-con`;

    btn.innerHTML = `
      <div class="btn info-color ${
        !hex && color.name != "без засветки" ? "rgb" : ""
      }" style="background-color:${hex ? "#" + hex : "none"}">
      <div class="intersections-img ${isBright(rgb) ? "inverted" : ""}"></div>
      <span class="${setContrastText(rgb)}">${
      color.name
      // + (color.name === "RGB" ? " (меняет цвет)" : "")
    }</span>
      </div>
      <div class="pick-indicator btn ${isPicked ? "active" : ""}">
      <div class="light-img"></div>
      </div>`;

    btn.onclick = (ev) => {
      choosingProp.id = color.id;
      choosingProp.color = color;
      choosingProp.isOn = true;

      if (
        choosingPropName === "faceLight" ||
        choosingPropName === "sideLight"
      ) {
        props["faceLight"].id = color.id;
        props["faceLight"].color = color;

        props["sideLight"].id = color.id;
        props["sideLight"].color = color;
      }

      if (!color.id) {
        props["faceLight"].isOn = false;
        props["sideLight"].isOn = false;
        setScenario([
          () =>
            switchWindow("picker", [
              choosingPropName.replace("Light", "Color"),
              "641",
            ]),
          () => {
            switchWindow("main");
            body.classList.add("modal-active");
          },
        ]);
      }

      if (props.scenario.isPlay) {
        playScenario();
        return;
      }

      switchWindow("main");
    };

    return btn;
  }
}
