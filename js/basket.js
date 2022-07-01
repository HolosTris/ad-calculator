import initHeader from "./header.js";
import initPreview from "./preview.js";
import { initColors, initFont, switchWindow } from "./script.js";
import { getNameFont, stylizeTextElem } from "./utils.js";

function initBasket(props) {
  initHeader();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const ordersList = document.getElementsByClassName("orders-list")[0];

  fillList(orders);

  function fillList(orders) {
    ordersList.innerHTML = "";

    const orderElems = [];

    for (let order of orders) orderElems.push(createOrderElem(order));

    ordersList.append(...orderElems);
  }

  function createOrderElem(order) {
    const date = new Date(order.timestamp);

    const orderElem = document.createElement("div");

    orderElem.className = `order-card`;

    initFont(order.font);

    orderElem.innerHTML = `
      <div class="title">
        <span class="label">текст вывески</span>
        <span class="value">${order.text}</span>
      </div>
      <div class="description">
        <div class="mini-preview">
          <object
            class="letter-render"
            type="image/svg+xml"
            data="./svg/letter/letter.svg"
          ></object>
        </div>

        <div class="description-body">
          <p class="font">
            <span class="label">шрифт</span>
            <span class="value">${getNameFont(order.font.values)}</span>
          </p>
          <p class="height-font">
            <span class="label">
              высота шрифта <span class="value">${
                order.textHeight * 100
              }</span> см
            </span>
          </p>
          <div class="order-actions">
            <button name="sendProject">прислать проект и счет</button>
            <button name="pay">оплатить</button>
          </div>
        </div>
      </div>
      <div class="extra">
        <p class="order-price">
          <span>
            <span class="label">
              стоимость <span class="value">---</span> рубля
            </span>
          </span>
          <span class="small">
            <span class="label">
              (ндс <span class="value">---</span> рублей)
            </span>
          </span>
        </p>
        <p class="with-discount">
          <span>
            <span class="label">
              со скидкой <span class="value">---</span> рубля
            </span>
          </span>
          <span class="small date">${getOrderDate(order.timestamp)}</span>
        </p>
      </div>`;

    initColors([
      order.faceColor,
      order.sideColor,
      order.faceLight,
      order.sideLight,
      order.backLight,
    ]);

    const titleElem = orderElem.querySelector(".title .value");

    console.log(order.font.values);

    stylizeTextElem(titleElem, order.font.values, order);

    const objSvg = orderElem.getElementsByClassName("letter-render")[0];

    initPreview(objSvg, order);

    orderElem.onclick = () => {
      pickOrder(order);
      switchWindow("main");
    };

    return orderElem;
  }

  function pickOrder(order) {
    props.textSign = order.text;
    props.font = order.font;
    props.signHeight = order.height;
    props.signWidth = order.width;
    props.textHeight = order.textHeight;
    props.mountHeight = order.mountHeight;
    props.faceColor = order.faceColor;
    props.faceLight = order.faceLight;
    props.sideColor = order.sideColor;
    props.sideLight = order.sideLight;
    props.backLight = order.backLight;
    props.isHighBrightness = order.isHighBrightness;
    props.filmType = order.filmType;
  }
}

function getOrderDate(timestamp) {
  const date = new Date(timestamp);

  const getTwoDigitStr = (num = 0) => {
    const numStr = num.toString();
    return numStr.length < 2 ? "0" + numStr : numStr;
  };

  const hours = getTwoDigitStr(date.getHours());
  const mins = getTwoDigitStr(date.getMinutes());
  const day = getTwoDigitStr(date.getDate());
  const month = getTwoDigitStr(date.getMonth());
  const year = date.getFullYear();

  return `${hours}:${mins} ${day}.${month}.${year}`;
}

// function initOrders() {}

export default initBasket;
