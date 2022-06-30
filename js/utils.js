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

export function getRgb(hex) {
  if (hex.length === 3)
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
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
    const curRGB =
      curCol.rgb && isDualColor(curCol) ? curCol.rgb[0] : curCol.rgb;

    return {
      color: curCol,
      similarity: calculateSimilarityColors(rgb, curRGB),
    };
  });
  const closestSimilarity = findClosestNum(
    comparedColors.map((item) => item.similarity),
    1
  );
  console.log(closestSimilarity);

  const similarColor = comparedColors.find(
    (item) => item.similarity === closestSimilarity
  ).color;
  console.log(similarColor);

  return similarColor;
}

export function calculateSimilarityColors(rgb1, rgb2) {
  if (!rgb1 || !rgb2) return 0;

  const [simR, simG, simB] = rgb1.map(
    (val, i) => 1 - Math.abs(val - rgb2[i]) / 255
    // invlerp(val, 255, rgb[i])
  );

  return (simR + simG + simB) / 3;
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

export function getNameFont(font) {
  const postfix =
    font.weight === "bold" || font.weight > 500
      ? " толстый"
      : font.weight === "normal" || font.weight == 500
      ? ""
      : " тонкий";
  return font.id + ". " + font.family + postfix;
}

export function stylizeTextElem(textElem, font, props) {
  textElem.style.fontFamily = font.family;
  textElem.style.fontWeight = font.weight;
  textElem.style.fontStyle = props.font.isItalic ? "italic" : "normal";
  if (props.faceColor.color.rgb) {
    const textRgb = isDualColor(props.faceColor.color)
      ? props.faceColor.color.rgb[+props.faceLight.isOn]
      : props.faceColor.color.rgb;

    textElem.style.color = "#" + getHex(textRgb);
    textElem.style.textShadow = isBright(textRgb)
      ? "none"
      : "-1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff";
  }
}

export function getTextSize(text, font) {
  const element = document.createElement("canvas");
  const ctx = element.getContext("2d");
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const textSize = {
    width: metrics.width,
    fontHeight: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
    actualHeight:
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
  };

  return textSize;
}

export function validate(value, type = "number") {
  switch (type) {
    case "number":
      validateNumber(value);
      break;
    case "text":
      validateText(value);
      break;
  }
}
function validateNumber(value) {}
function validateText(value) {}
