export function setContrastText(rgb) {
  if (!rgb) return "white-text";

  return isBright(rgb) ? "black-text" : "white-text";
}

export function isBright(rgb) {
  if (!rgb) return;

  const brightness = Math.round(
    (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  );
  return brightness > 125;
}

export function getHex(rgb) {
  if (!rgb) return "fff";

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
  const exactColor = palette.colors.find((curCol) => {
    if (curCol.id == color.id) return 1;
    if (curCol.name == color.name) return 1;
  });

  if (exactColor) return exactColor;

  if (!color.rgb) return palette.colors[0];

  const rgb = isDualColor(color) ? color.rgb[0] : color.rgb;
  const comparedColors = palette.colors.map((curCol) => {
    if (!curCol.rgb) return { color: curCol, similarity: Infinity };

    const curRGB = isDualColor(curCol) ? curCol.rgb[0] : curCol.rgb;
    const [simR, simG, simB] = curRGB.map(
      (val, i) => val - rgb[i]
      // invlerp(val, 255, rgb[i])
    );

    return { color: curCol, similarity: simR + simG + simB };
  });
  const closestSimilarity = findClosestNum(
    comparedColors.map((item) => item.similarity),
    0
  );
  console.log(closestSimilarity);

  const similarColor = comparedColors.find(
    (item) => item.similarity === closestSimilarity
  ).color;
  console.log(similarColor);

  return similarColor;
}

export function toCamelCase(text = "", separator = "_") {
  while (text.includes(separator)) {
    const firstLetter = text[text.indexOf(separator) + 1];
    text = text.replace(separator + firstLetter, firstLetter.toUpperCase());
  }

  return text;
}

export const lerp = (x, y, a) => x * (1 - a) + y * a;

export const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));

export const invlerp = (x, y, a) => (a - x) / (y - x);

export function findClosestNum(data, num) {
  console.log(...data);
  const closestMore = Math.min(...data.filter((v) => v > num));
  const closestLess = Math.max(...data.filter((v) => v < num));
  return closestMore - num < num - closestLess ? closestMore : closestLess;
}
