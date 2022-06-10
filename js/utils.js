export function setContrastText(rgb) {
  if (!rgb) return "#000";

  const brightness = Math.round(
    (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  );
  return brightness > 125 ? "black-text" : "";
}

export function getHex(rgb) {
  return rgb
    .map((x) => {
      const hexDig = x.toString(16);
      return hexDig.length === 1 ? "0" + hexDig : hexDig;
    })
    .join("");
}
