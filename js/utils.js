export function setContrastText(rgb) {
  if (!rgb) return "white-text";

  const brightness = Math.round(
    (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  );
  return brightness > 125 ? "black-text" : "white-text";
}

export function getHex(rgb) {
  return rgb
    .map((x) => {
      const hexDig = x.toString(16);
      return hexDig.length === 1 ? "0" + hexDig : hexDig;
    })
    .join("");
}

export function isDualColor(color) {
  return Array.isArray(color.rgb[0]);
}

export function findSimilarColor(color, palette) {
  return palette.colors.find((curCol) => {
    if (curCol.id == color.id) return 1;
    if (curCol.name == color.name) return 1;
  });
}
