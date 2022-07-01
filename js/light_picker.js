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
        choosingPropName != "backLight" &&
        props.faceLight.id &&
        props.sideLight.id
      ) {
        props["faceLight"].id = color.id;
        props["faceLight"].color = color;

        props["sideLight"].id = color.id;
        props["sideLight"].color = color;
      }

      if (!color.id) choosingProp.isOn = false;
      if (!color.id && choosingPropName != "backLight") {
        setScenario([
          () =>
            switchWindow("picker", [
              choosingPropName.replace("Light", "Color"),
              "641",
            ]),
          // () => {
          //   body.classList.add("modal-active");
          // },
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
