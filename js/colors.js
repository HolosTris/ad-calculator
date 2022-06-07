export default function (props) {
  const colorsList = document.getElementsByClassName("colors-list")[0];
  const lightIndicator = document.getElementsByClassName("light-indicator")[0];

  const palette = props.palette[colorsList.getAttribute("palette")];

  lightIndicator.onclick = () => {
    document.body.classList.toggle("light-on");
    fillList(palette.colors);
  };
  fillInfo(palette);
  fillList(palette.colors);

  // getPalette(colorsList.getAttribute("palette"));

  // async function getPalette(name) {
  //   return await fetch("./json/" + name + ".json")
  //     .then((res) => res.json())
  //     .catch((error) => alert(error))
  //     .then((pal) => {
  //       palette = pal;
  //     });
  // }

  function fillInfo(palette) {
    document.querySelector(".info p").innerHTML =
      palette.description + "<br/><a>Читать ещё</a>";
    document.querySelector(".info p a").href = palette.link;
  }

  function fillList(palette) {
    colorsList.innerHTML = "";

    for (let color of palette) {
      let r, g, b;

      if (color.rgb && Array.isArray(color.rgb[0])) {
        document.body.classList.add("used-light");
        [r, g, b] = document.body.classList.contains("light-on")
          ? color.rgb[1]
          : color.rgb[0];
      } else [r, g, b] = color.rgb ? color.rgb : [, ,];

      //  = color.rgb ? color.rgb : [, ,];
      const hex = color.rgb
        ? [r, g, b]
            .map((x) => {
              const hex = x.toString(16);
              return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
        : null;

      colorsList.insertAdjacentHTML(
        "beforeend",
        `
    <div class="btn ${
      color.rgb ? setContrastText([r, g, b]) : "black-text"
    }" style="background-color: #${hex ? hex : "fff"}">
    <b>${color.id}<br />
    ${color.name}</b><br />
    ${color.rgb ? "RGB " + [r, g, b].join("-") : ""}<br />
    ${color.ral ? "RAL " + color.ral : ""}<br />
    ${color.cmyk ? "CMYK " + color.cmyk.join("-") : ""}<br />
    ${hex ? "HEX " + hex.toUpperCase() : ""}<br />
    ${color.pantone ? "PANTONE " + color.pantone : ""}<br />
    ${color.tikkurila ? "TIKKURILA " + color.tikkurila : ""}
    </div>`
      );
    }

    const numCol = Math.floor(
      Number.parseFloat(getComputedStyle(colorsList).width) /
        Number.parseFloat(getComputedStyle(colorsList.firstElementChild).width)
    );

    for (let i = 0; i < numCol; i++)
      colorsList.insertAdjacentHTML("beforeend", "<div class='filler'></div>");
  }

  function setContrastText(rgb) {
    if (!rgb) return "#000";

    const brightness = Math.round(
      (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
    );
    return brightness > 125 ? "black-text" : "";
  }
}
