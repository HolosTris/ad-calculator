import { switchWindow } from "./script.js";
import { isDualColor, getHex, setContrastText } from "./utils.js";

export default function (
  props,
  choosingPropName = "faceColor",
  palId = "641",
  isLightOn = false
) {
  const body = document.body;
  body.setAttribute("choosing", choosingPropName);

  const colorsList = document.getElementsByClassName("colors-list")[0];
  colorsList.setAttribute("palette", "palette" + palId);

  const lightIndicator = document.getElementsByClassName("light-indicator")[0];
  isLightOn && lightIndicator.classList.add("light-on");

  const palette = props.palettes["palette" + palId];

  lightIndicator.onclick = () => {
    body.classList.toggle("light-on");
    fillList(palette.colors);
  };
  fillInfo(palette);
  fillList(palette.colors);

  function fillInfo(palette) {
    document.querySelector(".info p").innerHTML =
      palette.description + "<br/><a>Читать ещё</a>";
    document.querySelector(".info p a").href = palette.link;
  }

  function fillList(palette) {
    colorsList.innerHTML = "";

    const btns = [];

    for (let color of palette) {
      let rgb;

      if (color.rgb && isDualColor(color)) {
        body.classList.add("used-light");
        rgb = body.classList.contains("light-on") ? color.rgb[1] : color.rgb[0];
      } else rgb = color.rgb ? color.rgb : [, ,];

      btns.push(createBtn(color, rgb));
    }

    colorsList.append(...btns);

    const numCol = Math.floor(
      Number.parseFloat(getComputedStyle(colorsList).width) /
        Number.parseFloat(getComputedStyle(colorsList.firstElementChild).width)
    );

    for (let i = 0; i < numCol; i++)
      colorsList.insertAdjacentHTML("beforeend", "<div class='filler'></div>");
  }

  function createBtn(color, rgb) {
    const hex = color.rgb ? getHex(rgb) : null;

    const btn = document.createElement("div");

    btn.className = `btn ${color.rgb ? setContrastText(rgb) : "black-text"}`;
    btn.style.backgroundColor = "#" + (hex ? hex : "fff");

    btn.innerHTML = `
      <b>${color.id}<br />
      ${color.name}</b><br />
      ${color.rgb ? "RGB " + rgb.join("-") : ""}<br />
      ${color.ral ? "RAL " + color.ral : ""}<br />
      ${color.cmyk ? "CMYK " + color.cmyk.join("-") : ""}<br />
      ${hex ? "HEX " + hex.toUpperCase() : ""}<br />
      ${color.pantone ? "PANTONE " + color.pantone : ""}<br />
      ${color.tikkurila ? "TIKKURILA " + color.tikkurila : ""}`;

    btn.onclick = (ev) => {
      const choosingProp = props[choosingPropName];

      choosingProp.id = palId + "-" + color.id;
      choosingProp.palette = palette;
      choosingProp.color = color;

      ev.stopPropagation();
      switchWindow("main");
    };

    return btn;
  }
}
