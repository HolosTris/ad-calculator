// textSign: "",
// font: 1,
// textHeight: 0.1,
// signHeight: 1,
// signWidth: 1,
// mountHeight: 1,
// faceColor: 25,
// isFaceLight: true,
// sideColor: 25,
// isSideLight: false,
// backLight: "green",
// isHighBrightness: false,
import * as utils from "./utils.js";

const body = document.body;

export default function (props) {
  initInputs();
  initPropButtons();

  function initInputs() {
    const inputs = body.getElementsByTagName("input");

    for (let prop in props) {
      const inp = inputs.namedItem(prop);

      if (inp) {
        inp.value = props[prop];

        inp.onchange = () => {
          props[prop] = inp.classList.contains("inp-number")
            ? +inp.value
            : inp.value;
          inp.value = props[prop];
        };
      }
    }
  }

  function initPropButtons() {
    const buttons = body.getElementsByTagName("button");

    for (let prop in props) {
      const btn = buttons.namedItem(prop);

      if (!btn) continue;

      if (btn.parentElement.classList.contains("prop-color")) {
        const palId = props[prop].slice(0, props[prop].indexOf("-"));
        const color = props.palettes["palette" + palId].colors.find((col) =>
          palId + "-" + col.id == props[prop] ? 1 : 0
        );
        const rgb = Array.isArray(color.rgb[0])
          ? color.rgb[+props.isFaceLight]
          : color.rgb;
        console.log(color);

        btn.innerText = `${palId}-${color.id}\n ${color.name}`;
        btn.style.backgroundColor = "#" + utils.getHex(rgb);
        btn.classList.add(utils.setContrastText(rgb));

        btn.onclick = () => {
          body.classList.add("modal-active");
        };
      }

      if (btn.parentElement.classList.contains("prop-light")) {
        const changer = () => {
          props[prop]
            ? btn.classList.add("active")
            : btn.classList.remove("active");
        };
        changer();

        btn.onclick = () => {
          props[prop] = !props[prop];
          changer();
        };
      }
    }
  }
}
