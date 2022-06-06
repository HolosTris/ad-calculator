const colorsList = document.getElementsByClassName("colors-list")[0];
const lightIndicator = document.getElementsByClassName("light-indicator")[0];

let palette;

lightIndicator.onclick = () => {
  lightIndicator.classList.toggle("active");
  fillList(palette);
};

// palette641 = getPalette("palette641");

getPalette(colorsList.getAttribute("palette"));

async function getPalette(name) {
  return await fetch("./json/" + name + ".json")
    .then((res) => res.json())
    .catch((error) => alert(error))
    .then((pal) => {
      palette = pal;
      fillList(palette);
    });
}

function fillList(palette) {
  colorsList.innerHTML = "";
  for (let color of palette) {
    let r, g, b;

    if (color.rgb && Array.isArray(color.rgb[0]))
      [r, g, b] = lightIndicator.classList.contains("active")
        ? color.rgb[1]
        : color.rgb[0];
    // else if (color.rgb) [r,g,b]

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
    <div class="btn ${setContrastText([r, g, b])}" style="background-color: #${
        hex ? hex : "fff"
      }">
    <b>${color.id}<br />
    ${color.name}</b><br />
    RGB ${[r, g, b] ? [r, g, b].join("-") : ""}<br />
    ${color.ral ? "RAL " + color.ral : ""}<br />
    CMYK ${color.cmyk ? color.cmyk.join("-") : ""}<br />
    HEX ${hex ? hex.toUpperCase() : ""}<br />
    ${color.pantone ? "PANTONE " + color.pantone : ""}<br />
    ${color.tikkurila ? "TIKKURILA " + color.tikkurila : ""}
    </div>`
    );
  }
}

function setContrastText(rgb) {
  if (!rgb) return "#000";

  const brightness = Math.round(
    (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  );
  return brightness > 125 ? "black-text" : "";
}
