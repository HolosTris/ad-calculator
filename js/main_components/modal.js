import { switchWindow } from "../script.js";
import { findSimilarColor, getHex } from "../utils.js";

const body = document.body;

function initModal(props) {
  const modal = body.getElementsByClassName("modal")[0];

  modal.onclick = (ev) => {
    modal == ev.target && body.classList.remove("modal-active");
  };

  const controlBtns = modal.querySelectorAll(".modal-controls button");

  controlBtns.forEach(
    (btn) => (btn.onclick = () => body.classList.remove("modal-active"))
  );

  showModalActionBtns(props);
}

export function showModalActionBtns(props) {
  body.getElementsByClassName("modal-actions")[0].innerHTML = "";

  const btns = [];
  let pickingColor;

  if (props.faceLight.isOn) {
    pickingColor = findSimilarColor(
      props.faceColor.color,
      props.palettes.palette8500
    );

    btns.push(
      createModalActionBtn(pickingColor, "faceColor", "8500", true, true)
    );
    btns.push(
      createModalActionBtn(pickingColor, "faceColor", "8500", true, false)
    );
  } else {
    pickingColor = findSimilarColor(
      props.faceColor.color,
      props.palettes.palette641
    );

    btns.push(createModalActionBtn(pickingColor, "faceColor", "641", false));
  }

  if (props.sideLight.isOn) {
    pickingColor = findSimilarColor(
      props.sideColor.color,
      props.palettes.palette8500
    );
    btns.push(
      createModalActionBtn(pickingColor, "sideColor", "8500", true, true)
    );
    btns.push(
      createModalActionBtn(pickingColor, "sideColor", "8500", true, false)
    );
  } else {
    pickingColor = findSimilarColor(
      props.sideColor.color,
      props.palettes.palette641
    );
    console.log(pickingColor);
    btns.push(createModalActionBtn(pickingColor, "sideColor", "641", false));
  }

  document.getElementsByClassName("modal-actions")[0].append(...btns);
}

function createModalActionBtn(
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

export default initModal;
