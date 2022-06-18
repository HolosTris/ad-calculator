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
}

function initInputs(props) {
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
  const rgb = isDualColor(color) ? color.rgb[+lightProp] : color.rgb;

  btn.innerText = `${colorProp.id}\n ${color.name}`;
  btn.style.backgroundColor = "#" + getHex(rgb);
  btn.classList.add(setContrastText(rgb));
}

function initModal(props) {
  const modal = body.getElementsByClassName("modal")[0];
  console.log(body);

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
    console.log(pickingColor);
    btns.push(createActionBtn(pickingColor, "faceColor", "8500", true, true));
    btns.push(createActionBtn(pickingColor, "faceColor", "8500", true, false));
  } else {
    pickingColor = findSimilarColor(
      props.faceColor.color,
      props.palettes.palette641
    );
    console.log(pickingColor);
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

  btn.className = `pick-color ${withLight ? "with-ligth" : ""}`;
  btn.style.backgroundColor =
    "#" + (withIcon ? getHex(color.rgb[+withLight]) : getHex(color.rgb));

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
      цвет лица буквы
      ${withIcon ? "<br/>" + (withLight ? "с засветкой" : "без засветки") : ""}
    </div>`;

  btn.onclick = (ev) => {
    ev.stopPropagation();
    switchWindow("picker", [choosingProp, palId, withLight]);
  };

  return btn;
}
