// import { showModalActionBtns } from "../picker_components/modal.js";
import { changeLetterColor, toggleLight } from "../preview.js";
import {
  findSimilarColor,
  getHex,
  isDualColor,
  setContrastText,
  stylizeTextElem,
} from "../utils.js";
import { playScenario, setScenario, switchWindow } from "../script.js";
import picker from "../picker.js";

const body = document.body;

function initPropButtons(props) {
  const buttons = body.getElementsByTagName("button");

  const extraBtnColors = [,];

  for (let propName in props) {
    const btn = buttons.namedItem(propName);
    const prop = props[propName];

    if (!btn) continue;

    if (btn.parentElement.classList.contains("prop-color")) {
      const lightPropName = propName.replace("Color", "Light");
      renderColorBtn(btn, prop, props[lightPropName].isOn);

      btn.onclick = () => {
        switchWindow("picker", [
          propName,
          prop.id.slice(0, prop.id.indexOf("-")),
          props[lightPropName].isOn,
        ]);
        // body.classList.add("modal-active");
        // showModalActionBtns(props);
      };
    }

    if (btn.parentElement.classList.contains("prop-light")) {
      const lightColor = prop.color;

      renderLightBtn(btn, prop);

      btn.onclick = () => {
        const btnLabelText = btn.lastElementChild.textContent;

        if (lightColor.id === 0)
          if (propName != "backLight") {
            const scenarioTurns = [
              () => switchWindow("lightPicker", [propName]),
              () =>
                switchWindow("picker", [
                  propName.replace("Light", "Color"),
                  "8500",
                  false,
                ]),
              () => {
                switchWindow("main");
                body.classList.add("modal-active");
              },
            ];

            setScenario(scenarioTurns);
          } else switchWindow("lightPicker", [propName]);

        prop.isOn = !prop.isOn;

        renderLightBtn(btn, prop);

        const colorPropName = propName.replace("Light", "Color");
        const colorBtn = buttons.namedItem(colorPropName);

        if (colorBtn) {
          const textSign = document.getElementById("text-sign");

          renderColorBtn(colorBtn, props[colorPropName], prop.isOn);

          stylizeTextElem(textSign, props.font.values, props);

          changeLetterColor(
            propName.replace("Light", ""),
            props[colorPropName].color,
            prop.isOn
          );
        }

        toggleLight(propName, lightColor, prop.isOn, props.isHighBrightness);

        if (props.scenario.isPlay) {
          playScenario();
          return;
        }
      };

      btn.ondblclick = (ev) => switchWindow("lightPicker", [propName]);

      btn.oncontextmenu = (ev) => {
        ev.preventDefault();
        switchWindow("lightPicker", [propName]);
      };
    }

    if (btn.parentElement.classList.contains("prop-brightness")) {
      const render = () => {
        btn.disabled =
          !props.faceLight.id && !props.sideLight.id && !props.backLight.id
            ? true
            : false;
        prop ? btn.classList.add("active") : btn.classList.remove("active");
      };

      render();

      btn.onclick = () => {
        prop = !prop;

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

  // onclick for extra buttons
  const extraBtns = document.getElementsByClassName("extra-btn");

  [...extraBtns].forEach((btn, i) => {
    const propName = btn.parentElement.name;
    // const id = btn.firstElementChild.textContent;

    btn.onclick = (ev) => {
      ev.stopPropagation();

      props[propName].id = extraBtnColors[i].id;
      props[propName].color = extraBtnColors[i].color;
      props[propName].palette = extraBtnColors[i].palette;

      const letterElemName = propName.replace("Color", "");

      renderColorBtn(
        btn.parentElement,
        props[propName],
        props[letterElemName + "Light"].isOn
      );
      changeLetterColor(
        letterElemName,
        props[propName].color,
        props[letterElemName + "Light"].isOn
      );
    };
  });

  function renderColorBtn(btn, colorProp, isLight) {
    const color = colorProp.color;
    const rgb = color.rgb
      ? isDualColor(color)
        ? //color.rgb[+isLight]
          color.rgb[0]
        : color.rgb
      : null;

    btn.style.backgroundColor = rgb ? "#" + getHex(rgb) : "#fff";
    btn.classList.add(setContrastText(rgb ? rgb : [255, 255, 255]));

    const btnSpan = btn.firstElementChild;

    btnSpan.innerText = `${colorProp.id}\n ${color.name}`;

    if (btn.classList.contains("extra-btn")) {
      btnSpan.innerText = colorProp.id;
      return;
    }

    const extraBtn = btn.lastElementChild;

    if (
      props.faceColor.palette !== props.sideColor.palette &&
      colorProp.palette === props.palettes.palette641
    ) {
      const palId =
        colorProp.palette === props.palettes.palette641 ? "8500" : "641";
      const palette = props.palettes["palette" + palId];
      const extraColor =
        props.faceColor === colorProp
          ? props.sideColor.color
          : props.faceColor.color;
      const colorObj = {
        id: palId + "-" + extraColor.id,
        color: extraColor,
        palette: palette,
      };

      extraBtnColors[extraBtn.parentElement.name === "faceColor" ? 0 : 1] =
        colorObj;

      renderColorBtn(extraBtn, colorObj, isLight);
    } else extraBtn.style.display = "none";
  }

  function renderLightBtn(btn, lightProp) {
    const lightColor = lightProp.color;

    // Сброс стилей
    btn.style.backgroundColor = "";
    btn.classList.remove("black-text");
    btn.classList.remove("active");

    lightProp.isOn
      ? btn.classList.add("active")
      : btn.classList.remove("active");

    // setLabelBtn(btn, lightColor.name);

    const btnLabel = btn.lastElementChild;

    btnLabel.textContent = lightColor.name;

    const rgb = lightColor.rgb;

    const isLongLabel = btnLabel.textContent.length > 8;

    isLongLabel
      ? btn.classList.add("long-label")
      : btn.classList.remove("long-label");

    !rgb && lightColor.id != 0
      ? btn.classList.add("rgb")
      : btn.classList.remove("rgb");

    if (!rgb) return;

    if (lightProp.isOn) {
      btn.style.backgroundColor = "#" + getHex(rgb);
      btn.classList.add(setContrastText(rgb));

      if (lightColor.id < 4)
        btn.firstElementChild.style.backgroundColor = "#7c787d";
    } else {
      btn.style.borderColor = "#" + getHex(rgb);
    }
  }

  function setLabelBtn(btn, colorName) {
    const btnLabel = btn.lastElementChild;

    if (
      !props.faceLight.isOn &&
      !props.sideLight.isOn &&
      btn.name != "backLight"
    ) {
      btnLabel.textContent = "без засветки";
      buttons.namedItem("faceLight").lastElementChild.textContent !==
      "без засветки"
        ? renderLightBtn(buttons.namedItem("faceLight"), props["faceLight"])
        : null;
      buttons.namedItem("sideLight").lastElementChild.textContent !==
      "без засветки"
        ? renderLightBtn(buttons.namedItem("sideLight"), props["sideLight"])
        : null;
    } else if (btn.name != "backLight") {
      btnLabel.textContent = colorName;
      buttons.namedItem("faceLight").lastElementChild.textContent !== colorName
        ? renderLightBtn(buttons.namedItem("faceLight"), props["faceLight"])
        : null;
      buttons.namedItem("sideLight").lastElementChild.textContent !== colorName
        ? renderLightBtn(buttons.namedItem("sideLight"), props["sideLight"])
        : null;
    } else btnLabel.textContent = colorName;
  }
}
export default initPropButtons;
