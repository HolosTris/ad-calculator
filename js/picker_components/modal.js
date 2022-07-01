import { switchWindow } from "../script.js";
import {
  calculateSimilarityColors,
  findSimilarColor,
  getHex,
  getRgb,
  isDualColor,
} from "../utils.js";

const body = document.body;

function initModal(props) {
  const modal = body.getElementsByClassName("modal")[0];

  modal.onclick = (ev) =>
    modal == ev.target && body.classList.remove("modal-active");

  const btnsYes = modal.querySelectorAll(".modal-controls .btn-yes");

  btnsYes.forEach((btn) => (btn.onclick = () => switchWindow("main")));

  const btnsNo = modal.querySelectorAll(".modal-controls .btn-no");

  btnsNo.forEach(
    (btn) => (btn.onclick = () => body.classList.remove("modal-active"))
  );

  showModalActionBtns(props);
}

export function showModalActionBtns(props) {
  body.getElementsByClassName("modal-actions")[0].innerHTML = "";

  const btns = [];
  let pickingColor;

  for (let colorProp of [props.faceColor, props.sideColor]) {
    const color = colorProp.color;

    if (color.rgb && isDualColor(color)) {
      btns.push(createModalActionBtn(color, "faceColor", "8500", true, true));
      btns.push(createModalActionBtn(color, "faceColor", "8500", true, false));
    } else {
      btns.push(createModalActionBtn(color, "faceColor", "641", false));
    }
  }

  // Поиск похожего цвета в другой палитре, зависящее от засветки
  // if (props.sideLight.isOn) {
  //   pickingColor = findSimilarColor(
  //     props.sideColor.color,
  //     props.palettes.palette8500
  //   );
  //   btns.push(
  //     createModalActionBtn(pickingColor, "sideColor", "8500", true, true)
  //   );
  //   btns.push(
  //     createModalActionBtn(pickingColor, "sideColor", "8500", true, false)
  //   );
  // } else {
  //   pickingColor = findSimilarColor(
  //     props.sideColor.color,
  //     props.palettes.palette641
  //   );
  //   console.log(pickingColor);
  //   btns.push(createModalActionBtn(pickingColor, "sideColor", "641", false));
  // }

  document.getElementsByClassName("modal-actions")[0].append(...btns);
}

function createModalActionBtn(
  color,
  choosingProp,
  palId,
  withIcon,
  withLight = false
) {
  const btn = document.createElement("div");
  const elemLetter = choosingProp.replace("Color", "");

  const btnTextColor = withLight ? "fff" : "7c787d";
  // console.log(calculateSimilarityColors(color.rgb, getRgb(btnTextColor)));

  btn.className = `btn pick-color ${withLight ? "with-ligth" : ""} ${
    calculateSimilarityColors(color.rgb, getRgb(btnTextColor)) > 0.9
      ? "black-text"
      : ""
  }`;
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

  // btn.onclick = (ev) => {
  //   ev.stopPropagation();
  // };

  return btn;
}

export default initModal;
