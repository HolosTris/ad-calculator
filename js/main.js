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
import {
  getHex,
  setContrastText,
  isDualColor,
  findSimilarColor,
} from "./utils.js";

const body = document.body;

export default function (props) {
  initInputs(props);
  initPropButtons(props);
  initModal(props);
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
      const render = () => {
        props[prop].isOn
          ? btn.classList.add("active")
          : btn.classList.remove("active");
      };
      render();

      btn.onclick = () => {
        props[prop].isOn = !props[prop].isOn;

        render();

        const colorProp = prop.replace("Light", "Color");
        const colorBtn = buttons.namedItem(colorProp);

        colorBtn &&
          renderColorBtn(colorBtn, props[colorProp], props[prop].isOn);
      };

      btn.ondblclick = () => {};
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
  const rgb = isDualColor(colorProp.color) ? color.rgb[+lightProp] : color.rgb;

  btn.innerText = `${colorProp.id}\n ${color.name}`;
  btn.style.backgroundColor = "#" + getHex(rgb);
  btn.classList.add(setContrastText(rgb));
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

  let pickingColor;

  if (props.faceLight.isOn) {
    pickingColor = findSimilarColor(
      props.faceColor.color,
      props.palettes.palette8500
    );
    console.log(pickingColor);
    createActionBtn(pickingColor, "8500", true, true);
    createActionBtn(pickingColor, "8500", true, false);
  } else {
    pickingColor = findSimilarColor(
      props.faceColor.color,
      props.palettes.palette641
    );
    console.log(pickingColor);
    createActionBtn(pickingColor, "641", false);
  }

  if (props.sideLight.isOn) {
    pickingColor = findSimilarColor(
      props.sideColor.color,
      props.palettes.palette8500
    );
    createActionBtn(pickingColor, "8500", true, true);
    createActionBtn(pickingColor, "8500", true, false);
  } else {
    pickingColor = findSimilarColor(
      props.sideColor.color,
      props.palettes.palette641
    );
    createActionBtn(pickingColor, "641", false);
  }
}

function createActionBtn(color, palId, withIcon, withLight = false) {
  body.getElementsByClassName("modal-actions")[0].insertAdjacentHTML(
    "beforeend",
    `<button class="pick-color ${
      withLight ? "with-ligth" : ""
    }" style="background-color: #${
      withIcon ? getHex(color.rgb[+withLight]) : getHex(color.rgb)
    }">
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
        ${
          withIcon ? "<br/>" + (withLight ? "с засветкой" : "без засветки") : ""
        }
      </div>
    </button>`
  );
}
