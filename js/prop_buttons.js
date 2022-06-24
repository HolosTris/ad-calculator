import { showActionBtns } from "./modal.js";
import { changeLetterColor, toggleLight } from "./preview.js";
import { getHex, isDualColor, setContrastText } from "./utils.js";

const body = document.body;

function initPropButtons(props) {
  const buttons = body.getElementsByTagName("button");

  for (let prop in props) {
    const btn = buttons.namedItem(prop);

    if (!btn) continue;

    if (btn.parentElement.classList.contains("prop-color")) {
      const lightProp = prop.replace("Color", "Light");
      renderColorBtn(btn, props[prop], props[lightProp].isOn);

      btn.onclick = () => {
        body.classList.add("modal-active");
        showActionBtns(props);
      };
    }

    if (btn.parentElement.classList.contains("prop-light")) {
      const lightColor = props[prop].color;
      const render = () => {
        props[prop].isOn
          ? btn.classList.add("active")
          : btn.classList.remove("active");

        btn.lastElementChild.innerText = lightColor.name;

        const rgb = lightColor.rgb;

        if (!rgb || lightColor.id < 4) return;

        btn.style.backgroundColor = "#" + getHex(rgb);
        btn.classList.add(setContrastText(rgb));
      };
      render();

      btn.onclick = () => {
        props[prop].isOn = !props[prop].isOn;

        render();

        const colorPropName = prop.replace("Light", "Color");
        const colorBtn = buttons.namedItem(colorPropName);

        if (colorBtn) {
          renderColorBtn(colorBtn, props[colorPropName], props[prop].isOn);

          changeLetterColor(
            prop.replace("Light", ""),
            props[colorPropName].color,
            props[prop].isOn
          );
        }

        toggleLight(prop, lightColor, props[prop].isOn, props.isHighBrightness);
      };

      btn.ondblclick = (ev) => switchWindow("lightPicker", [prop]);

      btn.oncontextmenu = (ev) => {
        ev.preventDefault();
        switchWindow("lightPicker", [prop]);
      };
    }

    if (btn.parentElement.classList.contains("prop-brightness")) {
      const render = () => {
        props[prop]
          ? btn.classList.add("active")
          : btn.classList.remove("active");
      };

      render();

      btn.onclick = () => {
        props[prop] = !props[prop];

        render();

        toggleLight(
          "faceLight",
          props.faceLight.color,
          props.faceLight.isOn,
          props.isHighBrightness
        );

        toggleLight(
          "sideLight",
          props.sideLight.color,
          props.sideLight.isOn,
          props.isHighBrightness
        );

        toggleLight(
          "backLight",
          props.backLight.color,
          props.backLight.isOn,
          props.isHighBrightness
        );
      };
    }
  }
}

function renderColorBtn(btn, colorProp, lightProp) {
  const color = colorProp.color;
  const rgb = color.rgb
    ? isDualColor(color)
      ? color.rgb[+lightProp]
      : color.rgb
    : null;

  btn.innerText = `${colorProp.id}\n ${color.name}`;
  btn.style.backgroundColor = rgb ? "#" + getHex(rgb) : "#fff";
  btn.classList.add(setContrastText(rgb ? rgb : [255, 255, 255]));
}

export default initPropButtons;
