import { switchWindow } from "./script.js";

function initHeader() {
  const logoBtn = document.getElementById("logo-con");
  const basketBtn = document.getElementById("basket");

  logoBtn.onclick = () => switchWindow("main");

  basketBtn.onclick = () => switchWindow("basket");
}

export default initHeader;
