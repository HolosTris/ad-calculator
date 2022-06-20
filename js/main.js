import {
  getHex,
  setContrastText,
  isDualColor,
  findSimilarColor,
} from "./utils.js";
import { switchWindow } from "./script.js";
import initPreview, { changeLetterColor, toggleLight } from "./preview.js";

const body = document.body;

export default function (props) {
  initInputs(props);
  initPropButtons(props);
  initModal(props);
  initPreview(props);
  props.isWelcomed ? null : initWelcome(props);
}

function initInputs(props) {
  const inputs = body.getElementsByTagName("input");

  for (let prop in props) {
    const inp = inputs.namedItem(prop);

    if (!inp) continue;

    if (inp.name === "font") {
      const font = props.fonts.find((el) => props.font.id === el.id);
      const textSignElem = inputs.namedItem("textSign");

      if (!document.querySelector(`link[href='${font.path}']`))
        document.head.insertAdjacentHTML(
          "beforeend",
          `<link rel="stylesheet" href="${font.path}" />`
        );

      inp.style.fontFamily = font.family;
      inp.style.fontWeight = font.weight;
      inp.style.fontStyle = props.font.isItalic ? "italic" : "normal";

      textSignElem.style.fontFamily = font.family;
      textSignElem.style.fontWeight = font.weight;
      textSignElem.style.fontStyle = props.font.isItalic ? "italic" : "normal";

      console.log(textSignElem.labels);

      textSignElem.oninput = () =>
        (textSignElem.labels[0].style.display = "none");

      const postfix =
        font.weight === "bold" || font.weight > 500
          ? " толстый"
          : font.weight === "normal" || font.weight == 500
          ? ""
          : " тонкий";
      inp.value = font.id + ". " + font.family + postfix;

      inp.onclick = () => {
        switchWindow("fontPicker");
      };
    } else {
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

        const colorProp = prop.replace("Light", "Color");
        const colorBtn = buttons.namedItem(colorProp);

        if (colorBtn) {
          renderColorBtn(colorBtn, props[colorProp], props[prop].isOn);

          changeLetterColor(
            prop.replace("Light", ""),
            props[colorProp].color,
            props[prop].isOn
          );
        }
        toggleLight(prop, lightColor, props[prop].isOn);
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

function initModal(props) {
  const modal = body.getElementsByClassName("modal")[0];

  modal.onclick = (ev) => {
    modal == ev.target && body.classList.remove("modal-active");
  };

  const controlBtns = modal.querySelectorAll(".modal-controls button");

  controlBtns.forEach(
    (btn) => (btn.onclick = () => body.classList.remove("modal-active"))
  );

  showActionBtns(props);
}

function showActionBtns(props) {
  body.getElementsByClassName("modal-actions")[0].innerHTML = "";

  const btns = [];
  let pickingColor;

  if (props.faceLight.isOn) {
    pickingColor = findSimilarColor(
      props.faceColor.color,
      props.palettes.palette8500
    );

    btns.push(createActionBtn(pickingColor, "faceColor", "8500", true, true));
    btns.push(createActionBtn(pickingColor, "faceColor", "8500", true, false));
  } else {
    pickingColor = findSimilarColor(
      props.faceColor.color,
      props.palettes.palette641
    );

    btns.push(createActionBtn(pickingColor, "faceColor", "641", false));
  }

  if (props.sideLight.isOn) {
    pickingColor = findSimilarColor(
      props.sideColor.color,
      props.palettes.palette8500
    );
    btns.push(
      createActionBtn(
        pickingColor,
        "sideColor",
        "8500",
        "faceColor",
        true,
        true
      )
    );
    btns.push(createActionBtn(pickingColor, "sideColor", "8500", true, false));
  } else {
    pickingColor = findSimilarColor(
      props.sideColor.color,
      props.palettes.palette641
    );
    console.log(pickingColor);
    btns.push(createActionBtn(pickingColor, "sideColor", "641", false));
  }

  document.getElementsByClassName("modal-actions")[0].append(...btns);
}

function createActionBtn(
  color,
  choosingProp,
  palId,
  withIcon,
  withLight = false
) {
  const btn = document.createElement("button");
  const elemLetter = choosingProp.replace("Color", "");

  btn.className = `pick-color ${withLight ? "with-ligth" : ""}`;
  btn.style.backgroundColor = color.rgb
    ? "#" + (withIcon ? getHex(color.rgb[+withLight]) : getHex(color.rgb))
    : "#fff";

  btn.innerHTML = `
    <div class="name">
      ${palId + "-" + color.id}
      <br />
      ${color.name}
    </div>
    ${
      withIcon
        ? `<div class="btn"><img src="${
            withLight ? "./svg/light_white.svg" : "./svg/light_gray.svg"
          }" alt="" /></div>`
        : ""
    }
    <div class="tip">
      <img src="./svg/${elemLetter + (withLight ? "_light" : "")}.svg" alt="" />
      <p>
        цвет ${elemLetter === "face" ? "лица буквы" : "боковины"} 
        ${
          withIcon ? "<br/>" + (withLight ? "с засветкой" : "без засветки") : ""
        }
      </p>
    </div>`;

  btn.onclick = (ev) => {
    ev.stopPropagation();
    switchWindow("picker", [choosingProp, palId, withLight]);
  };

  return btn;
}

function initWelcome(props) {
  const paramsElems = [...body.getElementsByClassName("param")];
  const titleElem = body.getElementsByClassName("preview-title")[0];
  const welcomeElem = body.getElementsByClassName("welcome")[0];

  paramsElems.forEach((el) => (el.style.display = "none"));
  titleElem.style.display = "none";
  welcomeElem.style.display = "block";

  const hideWelcome = () => {
    paramsElems.forEach((el) => (el.style.display = "block"));
    titleElem.style.display = "block";
    welcomeElem.style.display = "none";
    body.removeEventListener("pointerdown", hideWelcome);
  };

  body.addEventListener("pointerdown", hideWelcome);

  props.isWelcomed = true;
}
